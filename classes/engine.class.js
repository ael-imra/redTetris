const { PLAYGROUND_HEIGHT, PLAYGROUND_WIDTH } = require("../configs")

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
}

module.exports = Engine