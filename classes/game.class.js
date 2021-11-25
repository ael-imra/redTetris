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
        return this.isPaused = !this.isPaused
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
}
module.exports = Game