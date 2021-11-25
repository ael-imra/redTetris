const { PLAYGROUND_HEIGHT, PLAYGROUND_WIDTH, MOVE_DOWN } = require('../configs')

class Engine {
    constructor(game, player) {
        if (!game) throw Error('incorrect game')
        this.game = game
        this.player = player
        this.field = this.createField()
        this.currentPiece = 0
        this.isFailed = false
        this.isWin = false
        this.score = 0
        /* a group of the last colors
         * to avoid repeating the same color
         * for the next upcoming pieces
         */
        this.lastColors = []
        this.piece = this.game.pieces[this.currentPiece].clone(this)
        this.nextPiece = this.game.pieces[this.currentPiece + 1].clone(this)
    }
    createField() {
        const field = new Array(PLAYGROUND_HEIGHT)
        for (let y = 0; y < PLAYGROUND_HEIGHT; y++) {
            field[y] = new Array(PLAYGROUND_WIDTH)
            field[y].fill(0)
        }
        return field
    }
    movePiece(key) {
        if (!this.isWin && !this.isFailed) this.piece.move(key)
    }
    start() {
        if (!this.interval) {
            this.interval = setInterval(
                () => this.movePiece(MOVE_DOWN),
                this.game.room.options.speed
            )
        }
        return !!this.interval
    }
    next() {
        this.setPiece(this.piece.shape(...this.piece.point))
        // this.isFailed = this.checkFailed()
        if (this.isFailed) {
            this.clean()
            // this.game.checkWinner()
        }
        if (this.isFailed || this.isWin) this.clean()
        if (this.game.pieces.length === this.currentPiece + 2) this.game.generate()
        this.piece = this.nextPiece
        this.nextPiece = this.game.pieces[++this.currentPiece + 1].clone(this)
        // if (typeof this.game.room.listener === 'function')
        //     this.game.room.listener('piece completed', this.player)
    }
    isFit(data) {
        if (
            data.max.y >= PLAYGROUND_HEIGHT ||
            data.min.x < 0 ||
            data.max.x >= PLAYGROUND_WIDTH
        )
            return false
        for (const point of data.map)
            if (point.y >= 0 && this.field[point.y][point.x] !== 0) return false
        return true
    }
    setPiece(data) {
        for (const point of data.map)
            if (
                point.y >= 0 &&
                point.y < PLAYGROUND_HEIGHT &&
                point.x >= 0 &&
                point.y < PLAYGROUND_WIDTH &&
                this.field[point.y] &&
                this.field[point.y][point.x] !== 0
            )
                return false
        for (const point of data.map)
            if (this.field[point.y] && this.field[point.y][point.x] === 0)
                this.field[point.y][point.x] = this.piece.color
        // return this.removeCompletedLines()
    }
    clean() {
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
            return true
        }
        return false
    }
}

module.exports = Engine
