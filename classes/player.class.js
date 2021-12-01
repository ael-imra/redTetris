const { CustomError } = require('../utils/errors')
const Room = require('./room.class')
const { validate } = require('../utils')
const _players = {}

class Player {
    constructor(name) {
        if (!validate('name', name)) throw new CustomError('incorrect player name')
        if (Player.getPlayer(name)) throw new CustomError('player name already exist')
        this.name = name
        _players[this.name] = this
    }
    static getPlayer(name) {
        return _players[name]
    }
    join(name) {
        if (!this.room) {
            const room = Room.getRoom(name)
            if (room && room.game && room.game.isStarted) throw new CustomError("can't join room while game started")
            if (room && room.add(this))
                this.room = room
            else
                this.room = new Room(this, name, {})
            return true
        }
        throw new CustomError('player already in room')
    }
    create(name, options) {
        if (!this.room) {
            this.room = new Room(this, name, options)
            return this.room
        }
        return false
    }
    disconnect() {
        if (this.room) {
            this.room.exit(this)
            delete this.room
        }
        delete _players[this.name]
        return true
    }
}

module.exports = Player