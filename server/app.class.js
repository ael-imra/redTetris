const http = require('http')
const send = require('send')
const parseUrl = require('parseurl')
const fs = require('fs')
const path = require('path')
const Socket = require('./socket.class')
const cache = {}
const MIMETYPE = {
    'html': 'text/html',
    'txt': 'text/plain',
    'js': 'application/javascript',
    'css': 'text/css'
}

class App {
    constructor(root) {
        this.init(root)
    }
    init(root) {
        this.root = path.join(__dirname, root)
        const rootExist = fs.existsSync(this.root)
        this.running = false
        if (!rootExist) throw new Error('root folder not found')
    }
    handleRequest() {
        this.server = http.createServer((req, res) => {
            if (req.method !== 'GET' && req.method !== 'HEAD') {
                // method not allowed
                res.statusCode = 405
                res.setHeader('Allow', 'GET, HEAD')
                res.setHeader('Content-Length', '0')
                res.end()
                return
            }
            req.parseUrl = parseUrl(req)
            if (path.join(this.root, req.parseUrl.path).indexOf(this.root) === -1) {
                // forbidden
                res.statusCode = 403
                res.setHeader('Content-Length', '0')
                res.end()
            }
            req.path = path.join(this.root, req.parseUrl.path)
            fs.exists(req.path, (exist) => {
                // if file not exist serve index.html
                // else serve file requested
                if (!exist || req.path === this.root + '/') {
                    req.path = path.join(this.root, 'index.html')
                    this.stream(req, res)
                }
                else this.stream(req, res)
            })
        })
    }
    createSocket(port) {
        this.socket = new Socket()
        if (port) this.socket.run(null, port)
        else if (this.server)
            this.socket.run(this.server)
    }

    handleError() {

    }

    async stream(req, res) {
        const readableStream = fs.createReadStream(req.path)
        if (!cache[req.path]) {
            cache[req.path] = {}
            cache[req.path].data = ""
            cache[req.path].type = MIMETYPE[path.extname(req.path).replace('.', '')]
            readableStream.on('data', (chunk) => {
                res.write(chunk)
                cache[req.path].data += chunk
            })
            readableStream.on('end', () => {
                res.end()
            })
            readableStream.on('error', (error) => {
                res.statusCode = 501
                res.setHeader('Content-Length', '0')
                res.end()
            })
        }
        else {
            res.statusCode = 200
            res.setHeader('Content-Type', cache[req.path].type)
            res.write(cache[req.path].data)
            res.end()
            return
        }
    }

    run(port, cb) {
        this.handleRequest()
        this.server.listen(port || 1337, () => {
            this.running = true
            if (cb)
                cb()
        })
    }
    close(cb) {
        if (this.running)
            this.server.close(cb)
    }
}

module.exports = App
