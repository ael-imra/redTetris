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
        if (!this.isWin && !this.isFailed) {
            this.piece.move(key)
            if (typeof this.game.room.listener === 'function' && !this.isFailed)
                this.game.room.listener('piece moved', this.player)
        }
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
        this.isFailed = this.checkFailed()
        if (this.isFailed) {
            this.clean()
            this.game.checkWinner()
        }
        if (this.isFailed || this.isWin) this.clean()
        if (this.game.pieces.length === this.currentPiece + 2) this.game.generate()
        this.piece = this.nextPiece
        this.nextPiece = this.game.pieces[++this.currentPiece + 1].clone(this)
        if (typeof this.game.room.listener === 'function')
            this.game.room.listener('piece completed', this.player)
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
            if (this.field[point.y] && this.field[point.y][point.x] === 0)
                this.field[point.y][point.x] = this.piece.color
        return this.removeCompletedLines()
    }
    removeCompletedLines() {
        let removeLine = false
        if (!this.isFailed) {
            const point = this.piece.shape(...this.piece.point)
            for (let y = point.min.y; y <= point.max.y; y++) {
                if (this.field[y]) {
                    const line = [...this.field[y]]
                    if (this.checkLine(line)) {
                        this.field.splice(y, 1)
                        this.field.unshift(new Array(PLAYGROUND_WIDTH))
                        this.field[0].fill(0)
                        this.game.addPenalty(this.player)
                        removeLine = true
                    }
                }
            }
        }
        if (removeLine) this.score += 20
        else this.score += 1
        return removeLine
    }
    checkFailed() {
        const data = this.piece.shape(...this.piece.point)
        if (data.min.y < 0) {
            return true
        }
        return false
    }
    checkLine(line) {
        for (const column of line)
            if (!column) return false
        return true
    }
    win() {
        this.isWin = true
        this.setPiece(this.piece.shape(...this.piece.point))
        this.clean()
    }
    getShadow() {
        let y = this.piece.point[1]
        while (this.isFit(this.piece.shape(this.piece.point[0], y)))
            y++
        return y - 1
    }
    generateInfo(event) {
        if (event === 'piece moved') {
            return {
                point: this.piece.point,
                shape: this.piece.shape.name,
                shadow: this.getShadow(),
                player: this.player.name,
                color: this.piece.color,
                score: this.score
            }
        }
        else if (event === 'piece completed') {
            return {
                field: this.field,
                currentPiece: this.piece.shape.name,
                nextPiecePiece: this.nextPiece.shape.name,
                currentColor: this.piece.color,
                nextColor: this.nextPiece.color,
                win: this.isWin,
                failed: this.isFailed,
                player: this.player.name,
                score: this.score
            }
        }
        return null
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
