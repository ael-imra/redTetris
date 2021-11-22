const SHAPES = require('./shapes')
const MOVE_UP = 38;
const MOVE_DOWN = 40;
const MOVE_LEFT = 37;
const MOVE_RIGHT = 39;
const MOVE_DEEP_DOWN = 32;
const PLAYGROUND_WIDTH = 10
const colors = [1, 2, 3, 4, 5]

class Piece {
    constructor(game, shape, engine) {
        this.game = game
        this.shape = SHAPES[shape] || SHAPES[this.random()]
        if (engine) {
            this.engine = engine
            this.point = [parseInt(PLAYGROUND_WIDTH / 2) - 1, -1]
            this.color = this.randomColor()
        }
    }
    move(key) {
        if (key === MOVE_UP) {
            if (!this.engine.isFit(this.shape.switch(...this.point))) {
                if (this.engine.isFit(this.shape.switch(...this.moveCorrectPoint(this.point)))) {
                    this.point = this.moveCorrectPoint(this.point)
                    this.shape = this.shape.switch
                }
                else return false
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
        else if (key === MOVE_DEEP_DOWN) {
            this.point[1] = this.engine.getShadow()
            this.engine.next()
        }
        else if (!this.engine.isFit(this.shape(...this.incY(1))))
            this.engine.next()
        else return false
        return true
    }
    incX(inc) {
        return [this.point[0] + inc, this.point[1]]
    }
    incY(inc) {
        return [this.point[0], this.point[1] + inc]
    }
    moveCorrectPoint(point) {
        if (point[0] === 0)
            return [point[0] + 1, point[1]]
        else if (point[0] === PLAYGROUND_WIDTH - 1)
            return [point[0] - 1, point[1]]
        return point
    }
    clone(engine) {
        return new Piece(this.game, this.shape.name, engine)
    }
    random() {
        const shapes = Object.keys(SHAPES)
        const shape = shapes[parseInt(Math.random() * shapes.length)]
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
        const color = colors[parseInt(Math.random() * colors.length)]
        if (this.engine.lastColors.indexOf(color) === -1) {
            if (this.engine.lastColors.length === 3) this.engine.lastColors.shift()
            this.engine.lastColors.push(color)
            return color
        }
        return this.randomColor()
    }
}

module.exports = Piece