const http = require('http')
const parseUrl = require('parseurl')
const fs = require('fs')
const path = require('path')
const send = require('send')
const serveStatic = require('serve-static')

const app = http.createServer((req, res) => {
    return serveFrontEnd(path.join(__dirname, '/static'))(req, res, () => res.end)
    // res.end()
})
function serveFrontEnd(root) {
    return function (req, res, next) {
        fs.exists(root, (rootExist) => {
            if (!rootExist) throw new Error('root folder not found')
            url = parseUrl(req)
            if (req.method !== 'GET' && req.method !== 'HEAD') {
                // method not allowed
                res.statusCode = 405
                res.setHeader('Allow', 'GET, HEAD')
                res.setHeader('Content-Length', '0')
                res.end()
                return
            }
            //if user try to request file not in root folder
            if (path.join(root, url.path).indexOf(root) === -1) {
                // forbidden
                res.statusCode = 403
                res.setHeader('Content-Length', '0')
                res.end()
            }
            req.path = path.join(root, url.path)
            fs.exists(req.path, (exist) => {
                // if file not exist serve index.html
                // else serve file requested
                if (!exist) {
                    req.path = path.join(root, 'index.html')
                    return streamFile(req, res, next)
                }
                return streamFile(req, res, next)
            })
            next()
        })
    }
}

function streamFile(req, res, next) {
    const stream = send(req, req.path)
    stream.on('error', (err) => {
        res.statusCode = err.statusCode
        res.setHeader('Content-Length', '0')
        res.end()
    })
    stream.pipe(res)
}
app.listen(1337)