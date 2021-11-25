const { PLAYGROUND_WIDTH, COLORS, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP } = require('../configs')
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
    move(key) {
        if (key === MOVE_UP) {
            const data = this.shape.switch(...this.point)
            if (!this.engine.isFit(data)) {
                if (this.engine.isFit(this.shape.switch(...this.moveCorrectPoint(this.point, data))))
                    this.shape = this.shape.switch
            }
            else
                this.shape = this.shape.switch
        }
        else if (key === MOVE_DOWN && this.engine.isFit(this.shape(...this.incY(1))))
            this.point[1] += 1
        else if (key === MOVE_LEFT && this.engine.isFit(this.shape(...this.incX(-1))))
            this.point[0] -= 1
        else if (key === MOVE_RIGHT && this.engine.isFit(this.shape(...this.incX(1))))
            this.point[0] += 1
        else if (!this.engine.isFit(this.shape(...this.incY(1))))
            this.engine.next()
    }
    incX(inc) {
        return [this.point[0] + inc, this.point[1]]
    }
    incY(inc) {
        return [this.point[0], this.point[1] + inc]
    }
    moveCorrectPoint(point, data) {
        if (data.min.x <= 0)
            point[0] += (-1 * data.min.x)
        else if (data.max.x >= PLAYGROUND_WIDTH - 1)
            point[0] += ((PLAYGROUND_WIDTH - 1) - data.max.x)
        return point
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