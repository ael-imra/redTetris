const io = require('socket.io')
const SocketSubscription = require('./subscriptions')
const socketCookieParser = require('socket.io-cookie-parser')
const _sockets = {}
class Socket {
    run(server, port) {
        if (port)
            this.io = io(port, {
                transports: ['websocket', 'polling'],
                cors: {
                    origin: true,
                    credentials: true,
                },
            })
        else if (server)
            this.io = new io.Server(server, { /* options */ })
        this.io.use(socketCookieParser())
        this.io.use(this.middleware)
        this.io.on('connect', ((socket) => _sockets[socket.username] = new SocketSubscription(this, socket)).bind(this))
    }
    static get sockets() {
        return _sockets
    }
    getSocket(username) {
        return _sockets[username]
    }
    middleware(socket, next) {
        const cookies = socket && socket.request && socket.request.cookies ? socket.request.cookies : null
        if (cookies) {
            const name = cookies.name ? cookies.name : null
            if (!name) {
                return socket.emit('handle error', 'you need to set name')
            }
            socket.username = name
            return next()
        }
    }
    removeSocket(username) {
        if (_sockets[username])
            delete _sockets[username]
    }
    close(cb) {
        if (this.io)
            this.io.close(cb)
    }
}

module.exports = Socket