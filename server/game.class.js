const Engine = require("./engine.class")
const Piece = require("./piece.class")

class Game {
    constructor(room) {
        if (!room) throw Error('incorrect room')
        this.room = room
        this.init()
    }
    init() {
        this.pieces = []
        this.engines = {}
        this.isStarted = false
        this.isPaused = false
        this.lastPieces = []
        this.generate()
    }
    start() {
        if (!this.isStarted) {
            this.isStarted = true
            for (const player of Object.values(this.room.players)) {
                this.engines[player.name] = new Engine(this, player)
                this.engines[player.name].start()
                this.room.listener('piece completed', player)
            }
            return true
        }
        else if (typeof this.isStarted !== 'undefined' && this.isStarted) throw new Error('game already started')
        return false
    }
    quit() {
        for (const player of Object.values(this.room.players)) {
            if (this.engines[player.name]) {
                this.engines[player.name].clean()
                delete this.engines[player.name]
            }
        }
        return delete this.room.game
    }
    pause() {
        for (const player of Object.keys(this.room.players))
            if (!this.isPaused)
                this.engines[player].clean()
            else
                this.engines[player].start()
        return this.isPaused = !this.isPaused
    }
    restart() {
        for (const player of Object.values(this.room.players))
            this.removePlayer(player)
        this.init()
        this.start()
        return true
    }
    addPenalty(player) {
        if (!player) throw new CustomError('incorrect player')
        if (this.room.options.mode !== 'single')
            for (const key of Object.keys(this.engines)) {
                if (key !== player.name) {
                    const field = this.engines[key].field
                    for (let y = field.length - 1; y >= 0; y--)
                        if (field[y][0] !== 6) {
                            for (let x = 0; x < field[y].length; x++)
                                field[y][x] = 6
                            break
                        }
                }
                this.room.listener('piece completed', this.engines[key].player)
            }
        return true
    }
    checkWinner() {
        const engines = Object.values(this.engines).filter(eng => !eng.isFailed)
        if (engines.length === 1) {
            engines[0].win()
            return true
        }
        return false
    }
    removePlayer(player) {
        if (player && this.engines[player.name]) {
            this.engines[player.name].clean()
            delete this.engines[player.name]
            return true
        }
        else if (!player) throw new Error('incorrect player')
        return false
    }
    generate() {
        const newPieces = []
        for (let i = 0; i < 50; i++)
            newPieces.push(new Piece(this))
        this.pieces.push(...newPieces)
    }
}

module.exports = Game