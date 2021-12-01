const { MODE_SINGLE, COLOR_BLOCKED_LINE } = require("../configs")
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
        /* a group of the last pieces
         * to avoid repeating the same piece
         * for the next upcoming pieces
         */
        this.lastPieces = []
        this.generate()
    }
    start() {
        if (this.isStarted)
            throw new Error('game already started')
        else {
            for (const player of Object.values(this.room.players)) {
                this.engines[player.name] = new Engine(this, player)
                this.engines[player.name].start()
                if (typeof this.room.listener === 'function')
                    this.room.listener('piece completed', this.engines[player.name].player)
            }
            this.isStarted = true
        }
        return !!this.isStarted
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
            if (!this.isPaused) {
                this.engines[player].clean()
            }
            else
                this.engines[player].start()
        this.isPaused = !this.isPaused
        return true
    }
    restart() {
        for (const player of Object.values(this.room.players))
            this.removePlayer(player)
        this.init()
        this.start()
        return true
    }
    generate() {
        for (let i = 0; i < 50; i++)
            this.pieces.push(new Piece(this))
    }
    removePlayer(player) {
        if (player && this.engines[player.name]) {
            this.engines[player.name].clean()
            delete this.engines[player.name]
            return true
        }
        return false
    }
    addPenalty(player) {
        if (this.room.options.mode !== MODE_SINGLE)
            for (const key of Object.keys(this.engines)) {
                if (key !== player.name && !this.engines[key].isFailed) {
                    const field = this.engines[key].field
                    for (let y = field.length - 1; y >= 0; y--)
                        if (field[y][0] !== COLOR_BLOCKED_LINE) {
                            for (let x = 0; x < field[y].length; x++)
                                field[y][x] = COLOR_BLOCKED_LINE
                            break
                        }
                }
                if (typeof this.room.listener === 'function')
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
}
module.exports = Game