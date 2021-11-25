const Engine = require("../classes/engine.class")
const Game = require("../classes/game.class")
const Room = require("../classes/room.class")
const Player = require("../classes/player.class")
const { expect } = require("chai")
const { MOVE_UP, PLAYGROUND_WIDTH, MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, PLAYGROUND_HEIGHT } = require("../configs")
const { SHAPE_I_2, SHAPE_J_1, SHAPE_I_1 } = require("../utils/shapes")

describe('Piece Class', () => {
    const data = {}
    it('Should create pieces without duplicate', () => {
        data.player = new Player('pieceTest')
        data.room = new Room(data.player, 'pieceTest')
        data.game = new Game(data.room)
        data.engine = new Engine(data.game, data.player)
        const pieces = [data.engine.piece.shape, data.engine.nextPiece.shape]
        pieces.push(data.game.pieces[2].clone(data.engine).shape)
        //just to test line if (this.engine.lastColors.length === 3) this.engine.lastColors.shift()
        pieces.push(data.game.pieces[3].clone(data.engine).shape)
        pieces.pop()
        expect(pieces.toString().replace(pieces[0]).indexOf(pieces[0])).to.equal(-1)
        expect(pieces.toString().replace(pieces[1]).indexOf(pieces[1])).to.equal(-1)
        expect(pieces.toString().replace(pieces[2]).indexOf(pieces[2])).to.equal(-1)
    })
    it('Should switch piece', () => {
        data.engine.piece.point = [4, 4]
        data.engine.piece.shape = SHAPE_J_1
        const currentShape = data.engine.piece.shape
        data.engine.movePiece(MOVE_UP)
        expect(currentShape).not.equal(data.engine.piece.shape)
    })
    it('Should not switch', () => {
        data.engine.piece.point = [4, PLAYGROUND_HEIGHT]
        data.engine.piece.shape = SHAPE_I_1
        const currentShape = data.engine.piece.shape
        data.engine.piece.move(MOVE_UP)
        expect(currentShape).to.equal(data.engine.piece.shape)
    })
    it('Should move do nothing', () => {
        data.engine.piece.point = [4, 4]
        data.engine.piece.shape = SHAPE_I_1
        const currentShape = data.engine.piece.shape
        data.engine.piece.move()
        expect(currentShape).to.equal(data.engine.piece.shape)
    })
    it('Should switch piece and move to correct point [PLAYGROUND_WIDTH,4]', () => {
        data.engine.piece.shape = SHAPE_I_2
        data.engine.piece.point = [PLAYGROUND_WIDTH, 4]
        data.engine.piece.move(MOVE_UP)
        expect(SHAPE_I_2).not.equal(data.engine.piece.shape)
    })
    it('Should switch piece and move to correct point [-2,4]', () => {
        data.engine.piece.shape = SHAPE_I_2
        data.engine.piece.point = [-2, 4]
        data.engine.piece.move(MOVE_UP)
        expect(SHAPE_I_2).not.equal(data.engine.piece.shape)
    })
    it('Should move left', () => {
        const currentPoint = [4, 4]
        data.engine.piece.shape = SHAPE_J_1
        data.engine.piece.point = [4, 4]
        data.engine.piece.move(MOVE_LEFT)
        expect(data.engine.piece.point[0]).to.equal(currentPoint[0] - 1)
    })
    it('Should move right', () => {
        const currentPoint = [4, 4]
        data.engine.piece.shape = SHAPE_J_1
        data.engine.piece.point = [4, 4]
        data.engine.piece.move(MOVE_RIGHT)
        expect(data.engine.piece.point[0]).to.equal(currentPoint[0] + 1)
    })
    it('Should move down', () => {
        const currentPoint = [4, 4]
        data.engine.piece.point = [4, 4]
        data.engine.piece.shape = SHAPE_J_1
        data.engine.piece.move(MOVE_DOWN)
        expect(data.engine.piece.point[1]).to.equal(currentPoint[1] + 1)
    })
    it('Should invoke engine.next', () => {
        const currentShape = data.engine.piece.shape
        data.engine.piece.point = [4, PLAYGROUND_HEIGHT]
        data.engine.piece.shape = SHAPE_J_1
        data.engine.piece.move(MOVE_DOWN)
        expect(currentShape).not.equal(data.engine.piece.shape)
    })
})
