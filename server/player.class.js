const CustomError = require('./errors')
const Room = require('./room.class')
const { validate } = require('./services')
const _players = {}

class Player {
    constructor(name) {
        if (!validate('name', name)) throw new CustomError('incorrect name')
        if (Player.getPlayer(name)) throw new CustomError('name already exist')
        this.name = name
        _players[this.name] = this
    }
    static getPlayer(name) {
        return _players[name]
    }
    join(name) {
        if (!this.room) {
            this.room = Room.getRoom(name)
            if (this.room)
                this.room.add(this)
            else
                this.room = new Room(this, name, {})
            return true
        }
        throw new CustomError('already in room')
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