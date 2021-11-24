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
            for (const player of Object.values(this.room.players))
                this.engines[player.name] = new Engine(this, player)
            this.isStarted = true
        }
        return !!this.isStarted
    }
    quit() {
        return delete this.room.game
    }
    pause() {
        return this.isPaused = !this.isPaused
    }
    restart() {
        this.init()
        this.start()
        return true
    }
    generate() {
        for (let i = 0; i < 50; i++)
            this.pieces.push(new Piece(this))
    }
}
module.exports = Game