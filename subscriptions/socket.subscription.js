const CustomError = require('../utils/errors')
const Player = require('../classes/player.class')
const { validate } = require('../utils')
const RoomSubscription = require('./room.subscription')
const GameSubscription = require('./game.subscription')

module.exports = class SocketSubscription {
    constructor(master, socket) {
        try {
            this.master = master
            this.io = master.io
            this.socket = socket
            this.player = new Player(this.socket.username)
            this.handleEvents()
        } catch (error) {
            this.handleError(error)
        }
    }

    handleEvents() {
        this.socket.on('create room', this.createRoom.bind(this))
        this.socket.on('join room', this.joinRoom.bind(this))
        this.socket.on('list rooms', this.getRooms.bind(this))
        this.socket.on('exit room', this.exitRoom.bind(this))
        this.socket.on('kick', this.kickRoom.bind(this))
        this.socket.on('message', this.sendMessage.bind(this))
        this.socket.on('message', this.sendMessage.bind(this))
        this.socket.on('start game', this.startGame.bind(this))
        this.socket.on('pause game', this.pauseGame.bind(this))
        this.socket.on('restart game', this.restartGame.bind(this))
        this.socket.on('move piece', this.movePiece.bind(this))
        this.socket.on('disconnect', this.disconnect.bind(this))
    }

    getRooms(name, page, limit) {
        try {
            const rooms = RoomSubscription.get.call(this, name, page, limit)
            this.socket.emit('list rooms', rooms)
        } catch (error) {
            this.handleError(error)
        }
    }

    createRoom(name, options) {
        try {
            const room = RoomSubscription.create.call(this, name, options)
            if (room) {
                this.socket.join(room.name)
                this.socket.emit('room joined', room)
            }
        } catch (error) {
            this.handleError(error)
        }
    }

    joinRoom(name) {
        try {
            const room = RoomSubscription.join.call(this, name)
            if (room && this.player) {
                this.io
                    .to(room.name)
                    .emit('player joined', { name: this.player.name, room: room.name })
                this.socket.join(room.name)
                this.socket.emit('room joined', room)
            }
        } catch (error) {
            this.handleError(error)
        }
    }

    kickRoom(username) {
        try {
            if (
                this.player &&
                this.player.room &&
                RoomSubscription.kick.call(this, username)
            ) {
                ``
                const room = this.player.room
                const master = this.master.getSocket(username)
                if (master) {
                    master.socket.leave(room.name)
                    master.socket.emit('room exited')
                }
                this.io
                    .to(room.name)
                    .emit('message', {
                        name: username,
                        message: 'kicked from room',
                    })
                this.io.to(room.name).emit('player exited', { name: username, hosted: room.hosted.name })
            }
        } catch (error) {
            this.handleError(error)
        }
    }

    sendMessage(message) {
        try {
            if (validate('message', message.trim())) {
                const msg = RoomSubscription.message.call(this, escape(message.trim()))
                if (msg) this.io.to(this.player.room.name).emit('message', msg)
            }
        } catch (error) {
            this.handleError(error)
        }
    }

    exitRoom() {
        try {
            if (this.player && this.player.room) {
                const room = this.player.room
                const name = this.player.name
                if (RoomSubscription.exit.call(this)) {
                    this.socket.leave(room.name)
                    this.socket.emit('room exited')
                    this.io
                        .to(room.name)
                        .emit('message', { name, message: 'exited from room' })
                    this.io
                        .to(room.name)
                        .emit('player exited', { name, hosted: room.hosted.name })
                }
            }
        } catch (error) {
            this.handleError(error)
        }
    }

    disconnect() {
        try {
            if (this.player) {
                const room = this.player.room
                const name = this.player.name
                if (room) {
                    this.io
                        .to(room.name)
                        .emit('message', { name, message: 'exited from room' })
                    this.io
                        .to(room.name)
                        .emit('player exited', { name, hosted: room.hosted.name })
                }
                this.player.disconnect()
                this.master.removeSocket(this.player.name)
            }
        } catch (error) {
            this.handleError(error)
        }
    }

    startGame() {
        try {
            if (GameSubscription.start.call(this, this.listener.bind(this))) {
                const room = this.player.room
                this.io.to(room.name).emit('game started')
                // const info = GameSubscription.getInfo.call(this, 'piece completed')
                // if (info)
                //     this.io.to(room.name).emit('piece completed', info)
            }
        } catch (error) {
            this.handleError(error)
        }
    }

    pauseGame() {
        try {
            if (GameSubscription.pause.call(this)) {
                const room = this.player.room
                console.log("PAUSED")
                this.io.to(room.name).emit('game paused')
            }
        } catch (error) {
            this.handleError(error)
        }
    }

    restartGame() {
        try {
            if (GameSubscription.restart.call(this)) {
                const room = this.player.room
                this.io.to(room.name).emit('game restarted')
            }
        } catch (error) {
            this.handleError(error)
        }
    }

    movePiece(key) {
        try {
            GameSubscription.move.call(this, key)
        } catch (error) {
            this.handleError(error)
        }
    }

    listener(event, player) {
        try {
            if (player && player.room) {
                const room = player.room
                const info = GameSubscription.getInfo.call({ player }, event)
                if (info)
                    this.io.to(room.name).emit(event, info)
            }
        } catch (error) {
            this.handleError(error)
        }
    }

    handleError(error) {
        this.socket.emit('handle error', error.message)
    }
}
