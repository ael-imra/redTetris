const parseUrl = require('parseurl')
const http = require('http')
const mimes = require('mime-types')
const { pExt, pJoin, pNormalize, pResolve, fsCreateReadStream, fsExists, fsExistsSync, fsStat } = require('../utils')
const { HTTP_ERROR, FOLDER_NOT_FOUND, METHOD_NOT_ALLOWED, FORBIDDEN } = require('../utils/errors')

module.exports = class App {
    constructor(root, options) {
        this.root = pResolve(root || '.')
        if (!fsExistsSync(this.root)) throw Error(FOLDER_NOT_FOUND)
        this.options = options || {}
        if (!this.options.index) this.options.index = 'index.html'
    }
    serve(port, next) {
        this.server = http.createServer(async (req, res) => {
            try {
                if (req.method !== 'GET') throw new HTTP_ERROR(METHOD_NOT_ALLOWED, 405)
                const url = parseUrl(req)
                let file = pNormalize(pJoin(this.root, url.pathname))
                if (file.indexOf(this.root) === -1) throw new HTTP_ERROR(FORBIDDEN, 403)
                if (!pExt(file)) file = pJoin(this.root, this.options.index)
                const exist = await fsExists(file)
                if (!exist) file = pJoin(this.root, this.options.index)
                const [error, stat] = await fsStat(file)
                if (req.headers['if-modified-since'] && new Date(req.headers['if-modified-since']).getTime() === stat.mtime.getTime()) {
                    res.writeHead(304)
                    return res.end()
                }
                const header = {
                    'content-type': mimes.lookup(file) || 'text/plain',
                    'Cache-Control': `public, max-age=${this.options.cache || 43200}`,
                    'Last-Modified': stat.mtime.toISOString(),
                    'content-length': stat.size
                }
                res.writeHead(200, header)
                this.stream(res, file)
            } catch (error) {
                this.handleError(res, error)
            }
        })
        this.server.listen(port || 9690, () => {
            if (next)
                next()
        })
    }
    stream(res, file) {
        const readStream = fsCreateReadStream(file)
        readStream.pipe(res)
    }
    handleError(res, error) {
        if (error instanceof HTTP_ERROR) {
            res.writeHead(error.status, error.header)
            return res.end()
        }
        res.end()
    }
    close(next) {
        if (this.server)
            return this.server.close(() => {
                this.server = null
                if (next)
                    next()
            })
        if (next)
            return next()
        return null
    }
}
