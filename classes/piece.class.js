const { PLAYGROUND_WIDTH, COLORS } = require('../configs')
const shapes = require('../utils/shapes')

class Piece {
    constructor(game, engine, shape) {
        this.game = game
        if (engine) {
            this.engine = engine
            this.point = [parseInt(PLAYGROUND_WIDTH / 2) - 1, -1]
            this.color = this.randomColor()
        }
        this.shape = shapes[shape] || shapes[this.random()]
    }
    clone(engine) {
        return new Piece(this.game, engine, this.shape.name)
    }
    random() {
        const shapesKeys = Object.keys(shapes)
        const shape = shapesKeys[parseInt(Math.random() * shapesKeys.length)]
        const concatPieces = this.game.lastPieces.toString()
        const splitShape = shape.split('_')
        if (concatPieces.indexOf(`_${splitShape[1]}`) === -1) {
            if (this.game.lastPieces.length === 5) this.game.lastPieces.shift()
            this.game.lastPieces.push(shape)
            return shape
        }
        return this.random()
    }
    randomColor() {
        const color = COLORS[parseInt(Math.random() * COLORS.length)]
        if (this.engine.lastColors.indexOf(color) === -1) {
            if (this.engine.lastColors.length === 3) this.engine.lastColors.shift()
            this.engine.lastColors.push(color)
            return color
        }
        return this.randomColor()
    }
}

module.exports = Piece