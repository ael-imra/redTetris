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
    }
    start() {
        if (this.isStarted)
            throw new Error('game already started')
        else {
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
}
module.exports = Game