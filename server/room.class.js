const CustomError = require("./errors")
const Game = require("./game.class")
const { removeUnexpectedProperties } = require("./services")
const _rooms = {}
const ROOM_OPTIONS = ['speed', 'maxPlayers', 'privacy', 'mode']
const DEFAULT_ROOM_OPTIONS = {
    speed: 1000,
    maxPlayers: 1,
    privacy: 'public',
    mode: 'single'
}


class Room {
    constructor(player, name, options) {
        if (!player) throw new CustomError('incorrect player')
        if (typeof name !== 'string' || typeof options !== 'object') throw new CustomError('name must be string and options must be object')
        if (Room.getRoom(name)) throw new CustomError('name already exist')
        this.name = name
        this.hosted = player
        this.players = { [player.name]: player }
        this.messages = []
        this.options = removeUnexpectedProperties(options, ROOM_OPTIONS, DEFAULT_ROOM_OPTIONS)
        if (this.options.mode === 'single')
            this.options.maxPlayers = 1
        else if (this.options.maxPlayers > 10 || this.options.maxPlayers < 2)
            this.options.maxPlayers = 10
        _rooms[name] = this
    }
    static get rooms() {
        return _rooms
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
            options: this.options
        }
    }
    add(player) {
        if (!player) throw new CustomError('incorrect player')
        if (this.options.mode === 'single') throw new CustomError('can\'t join this room')
        if (this.options.mode !== 'single' && Object.keys(this.players).length + 1 <= this.options.maxPlayers && !this.players[player.name]) {
            this.players[player.name] = player
            return true
        }
        return false
    }
    startGame(player, listener) {
        if (this.options.mode === 'multi' && Object.keys(this.players).length === 1) throw new CustomError('room need at least 2 player start game')
        if (this.hosted.name === player.name) {
            this.game = new Game(this)
            this.listener = listener
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
        if (this.hosted.name === player.name)
            return this.game.restart()
        return false
    }
    kick(player, username) {
        if (player && player.name === this.hosted.name && player.name !== username && this.players[username] && (!this.game || !this.game.isStarted))
            return this.exit(this.players[username])
        return false
    }
    exit(player) {
        if (player) {
            const players = Object.keys(this.players)
            if (this.hosted.name === player.name && players.length > 1) {
                this.hosted = this.players[players[1]]
                if (players.length === 2 && this.game && this.game.isStarted && this.game.engines && this.game.engines[players[1]]) {
                    this.game.engines[players[1]].win()
                }
            } else if (this.hosted.name === player.name) {
                if (this.game) {
                    this.game.quit()
                }
                delete _rooms[this.name]
            }
            if (this.game)
                this.game.removePlayer(player)
            delete this.players[player.name].room
            delete this.players[player.name]
            return true
        }
        return false
    }
}

module.exports = Room