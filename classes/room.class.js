const {
    ROOM_OPTIONS,
    DEFAULT_ROOM_OPTIONS,
    MAX_PLAYERS,
    MIN_PLAYERS,
    MODE_SINGLE,
} = require('../configs')
const { CustomError } = require('../utils/errors')
const { removeUnexpectedProperties, validate } = require('../utils')
const Game = require('./game.class')
const _rooms = {}

class Room {
    constructor(player, name, options) {
        if (!player) throw new CustomError('incorrect player')
        if (!validate('name', name)) throw new CustomError('incorrect room name')
        if (Room.getRoom(name))
            throw new CustomError('room with this name already exist')
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
        this.setOptions(options)
        _rooms[name] = this
    }
    static getRoom(name) {
        return _rooms[name]
    }
    get info() {
        return {
            name: this.name,
            hosted: this.hosted.name,
            players: Object.keys(this.players),
            messages: this.messages,
            options: this.options,
        }
    }
    setOptions(options) {
        this.options = removeUnexpectedProperties(
            options || {},
            ROOM_OPTIONS,
            DEFAULT_ROOM_OPTIONS
        )
        if (this.options.mode === MODE_SINGLE) this.options.maxPlayers = 1
        else if (
            this.options.maxPlayers > MAX_PLAYERS ||
            this.options.maxPlayers < MIN_PLAYERS
        )
            this.options.maxPlayers =
                this.options.maxPlayers > MAX_PLAYERS ? MAX_PLAYERS : MIN_PLAYERS
    }
    add(player) {
        if (!player) throw new CustomError('incorrect player')
        if (this.options.mode === MODE_SINGLE)
            throw new CustomError("can't join this room")
        if (
            this.options.mode !== MODE_SINGLE &&
            Object.keys(this.players).length + 1 <= this.options.maxPlayers &&
            !this.players[player.name]
        ) {
            this.players[player.name] = player
            return true
        }
        return false
    }
    kick(player, username) {
        if (
            player &&
            player.name === this.hosted.name &&
            player.name !== username &&
            this.players[username]
        )
            return this.exit(this.players[username])
        return false
    }
    exit(player) {
        if (player) {
            const players = Object.keys(this.players)
            if (this.hosted.name === player.name && players.length > 1)
                this.hosted = this.players[players[1]]
            else if (this.hosted.name === player.name) delete _rooms[this.name]
            delete this.players[player.name].room
            delete this.players[player.name]
            return true
        }
        return false
    }

    /**
     * listener is function
     * every time piece move listener is invoke
     */
    startGame(player, listener) {
        if (
            this.options.mode !== MODE_SINGLE &&
            Object.keys(this.players).length === 1
        )
            throw new CustomError('room need at least 2 player to start game')
        if (this.hosted.name === player.name) {
            if (!this.game) {
                this.game = new Game(this)
                this.listener = listener
            }
            return this.game.start()
        }
        return false
    }
    pauseGame(player) {
        if (this.game && this.hosted.name === player.name && this.game.isStarted) {
            this.game.pause()
            return true
        }
        return false
    }
    restartGame(player) {
        if (this.hosted.name === player.name && this.game.isStarted) return this.game.restart()
        return false
    }
}

module.exports = Room
