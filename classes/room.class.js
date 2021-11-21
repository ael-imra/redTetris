const {
    ROOM_OPTIONS,
    DEFAULT_ROOM_OPTIONS,
    MAX_PLAYERS,
    MIN_PLAYERS
} = require('../configs')
const { CustomError } = require('../utils/errors')
const {
    removeUnexpectedProperties,
    validate,
} = require('../utils')
const _rooms = {}

class Room {
    constructor(player, name, options) {
        if (!player)
            throw new CustomError('incorrect player')
        if (!validate('name', name))
            throw new CustomError('incorrect room name')
        if (Room.getRoom(name))
            throw new CustomError(
                'room with this name already exist'
            )
        this.name = name
        this.hosted = player
        this.players = { [player.name]: player }
        this.messages = []
        this.options = options || {}
        this.options = removeUnexpectedProperties(
            this.options,
            ROOM_OPTIONS,
            DEFAULT_ROOM_OPTIONS
        )
        if (this.options.mode === 'single')
            this.options.maxPlayers = 1
        else if (
            this.options.maxPlayers > MAX_PLAYERS ||
            this.options.maxPlayers < MIN_PLAYERS
        )
            this.options.maxPlayers = this.options.maxPlayers > MAX_PLAYERS ? MAX_PLAYERS : MIN_PLAYERS
        _rooms[name] = this
    }
    static getRoom(name) {
        return _rooms[name]
    }
    add(player) {
        if (!player)
            throw new CustomError('incorrect player')
        if (this.options.mode === 'single')
            throw new CustomError(
                "can't join this room"
            )
        if (
            this.options.mode !== 'single' &&
            Object.keys(this.players).length + 1 <=
            this.options.maxPlayers &&
            !this.players[player.name]
        ) {
            this.players[player.name] = player
            return true
        }
        return false
    }
    exit(player) {
        if (player) {
            const players = Object.keys(this.players)
            if (this.hosted.name === player.name && players.length > 1)
                this.hosted = this.players[players[1]]
            else if (this.hosted.name === player.name)
                delete _rooms[this.name]
            delete this.players[player.name].room
            delete this.players[player.name]
            return true
        }
        return false
    }
}


module.exports = Room
