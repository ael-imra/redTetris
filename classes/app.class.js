const path = require('path')
const fs = require('fs')
const parseUrl = require('parseurl')
const http = require('http')
const mimes = require('mime-types')
const { HTTP_ERROR } = require('../utils/errors')

module.exports = class App {
    constructor(root, options) {
        this.root = path.resolve(root || '.')
        this.options = options || {}
        if (!this.options.index) this.options.index = 'index.html'
    }
    serve(port) {
        this.server = http.createServer((req, res) => {
            try {
                console.log(req.headers, 'O:')
                const url = parseUrl(req)
                let file = path.normalize(path.join(path.join(this.root, url.pathname)))
                if (!path.extname(file)) file = path.join(this.root, this.options.index)
                if (file.indexOf(this.root) === -1) throw new HTTP_ERROR('you do not have permission to this file', 403)
                fs.exists(file, (exit) => {
                    if (!exit) file = path.join(this.root, this.options.index)
                    fs.stat(file, (error, stat) => {
                        console.log(this.options.cache || 43200, 'cache', file)
                        const header = {
                            'content-type': mimes.lookup(file) || 'text/plain',
                            'Cache-Control': `public, max-age=${this.options.cache || 43200}`,
                            'content-length': stat.size
                        }
                        res.writeHead(200, header)
                        this.stream(res, file)
                    })
                })
            } catch (error) {
                console.log(error)
                this.handle(res, error)
            }
        })
        this.server.listen(process.env.PORT || port || 1337)
    }
    stream(res, file) {
        const readStream = fs.createReadStream(file)
        readStream.on('error', (error) => {
            return this.handle(res, new HTTP_ERROR('cannot read this file', 400))
        })
        readStream.pipe(res)
    }
    handle(res, error) {
        if (error instanceof HTTP_ERROR) {
            res.writeHead(error.status, error.header)
            return res.end()
        }
        res.end()
    }
}