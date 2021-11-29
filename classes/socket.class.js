const io = require('socket.io')
const socketCookieParser = require('socket.io-cookie-parser')
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
        this.io.use(socketCookieParser())
        this.io.use(this.middleware)
        this.io.on('connect', ((socket) => socket))
    }
    middleware(socket, next) {
        const cookies = socket && socket.request && socket.request.cookies ? socket.request.cookies : null
        const name = cookies && cookies.name ? cookies.name : null
        if (name) {
            socket.username = name
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