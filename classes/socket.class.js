const io = require('socket.io')
const socketCookieParser = require('socket.io-cookie-parser')
const SocketSubscription = require('../subscriptions/socket.subscription')
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
            this.io = new io.Server(server)
        if (this.io) {
            this.io.use(socketCookieParser())
            this.io.use(this.middleware)
            this.io.on('connect', ((socket) => _sockets[socket.username] = new SocketSubscription(this, socket)).bind(this))
        }
    }
    middleware(socket, next) {
        if (socket?.request?.cookies?.name) {
            socket.username = socket.request.cookies.name
            return next()
        }
        return next(new Error('name is required'))
    }
    close(cb) {
        if (this.io)
            this.io.close(cb)
    }
}

module.exports = Socket