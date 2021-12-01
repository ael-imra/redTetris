const Engine = require("../classes/engine.class")
const Game = require("../classes/game.class")
const Room = require("../classes/room.class")
const Player = require("../classes/player.class")
const { expect } = require("chai")
const { MOVE_UP, PLAYGROUND_WIDTH, MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, PLAYGROUND_HEIGHT, MOVE_DEEP_DOWN } = require("../configs")
const { SHAPE_I_2, SHAPE_J_1, SHAPE_I_1 } = require("../utils/shapes")

describe('Piece Class', () => {
    it('Should create pieces without duplicate', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player)
        player.room.game.engines[player.name].clean()
        const engine = player.room.game.engines.player
        const pieces = [engine.piece.shape, engine.nextPiece.shape]
        pieces.push(player.room.game.pieces[2].clone(engine).shape)
        //just to test line if (this.engine.lastColors.length === 3) this.engine.lastColors.shift()
        pieces.push(player.room.game.pieces[3].clone(engine).shape)
        pieces.pop()
        expect(pieces.toString().replace(pieces[0]).indexOf(pieces[0])).to.equal(-1)
        expect(pieces.toString().replace(pieces[1]).indexOf(pieces[1])).to.equal(-1)
        expect(pieces.toString().replace(pieces[2]).indexOf(pieces[2])).to.equal(-1)
        player.disconnect()
    })
    it('Should switch piece', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player)
        player.room.game.engines[player.name].clean()
        const engine = player.room.game.engines.player
        engine.piece.point = [4, 4]
        engine.piece.shape = SHAPE_J_1
        const currentShape = engine.piece.shape
        engine.movePiece(MOVE_UP)
        expect(currentShape).not.equal(engine.piece.shape)
        player.disconnect()
    })
    it('Should not switch', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player)
        player.room.game.engines[player.name].clean()
        const engine = player.room.game.engines.player
        engine.piece.point = [4, PLAYGROUND_HEIGHT]
        engine.piece.shape = SHAPE_I_1
        const currentShape = engine.piece.shape
        engine.piece.move(MOVE_UP)
        expect(currentShape).to.equal(engine.piece.shape)
        player.disconnect()
    })
    it('Should move do nothing', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player)
        player.room.game.engines[player.name].clean()
        const engine = player.room.game.engines.player
        engine.piece.point = [4, 4]
        engine.piece.shape = SHAPE_I_1
        const currentShape = engine.piece.shape
        engine.piece.move()
        expect(currentShape).to.equal(engine.piece.shape)
        player.disconnect()
    })
    it('Should switch piece and move to correct point [PLAYGROUND_WIDTH,4]', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player)
        player.room.game.engines[player.name].clean()
        const engine = player.room.game.engines.player
        engine.piece.shape = SHAPE_I_2
        engine.piece.point = [PLAYGROUND_WIDTH, 4]
        engine.piece.move(MOVE_UP)
        expect(SHAPE_I_2).not.equal(engine.piece.shape)
        player.disconnect()
    })
    it('Should switch piece and move to correct point [-2,4]', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player)
        player.room.game.engines[player.name].clean()
        const engine = player.room.game.engines.player
        engine.piece.shape = SHAPE_I_2
        engine.piece.point = [-2, 4]
        engine.piece.move(MOVE_UP)
        expect(SHAPE_I_2).not.equal(engine.piece.shape)
        player.disconnect()
    })
    it('Should move left', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player)
        player.room.game.engines[player.name].clean()
        const engine = player.room.game.engines.player
        const currentPoint = [4, 4]
        engine.piece.shape = SHAPE_J_1
        engine.piece.point = [4, 4]
        engine.piece.move(MOVE_LEFT)
        expect(engine.piece.point[0]).to.equal(currentPoint[0] - 1)
        player.disconnect()
    })
    it('Should move right', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player)
        player.room.game.engines[player.name].clean()
        const engine = player.room.game.engines.player
        const currentPoint = [4, 4]
        engine.piece.shape = SHAPE_J_1
        engine.piece.point = [4, 4]
        engine.piece.move(MOVE_RIGHT)
        expect(engine.piece.point[0]).to.equal(currentPoint[0] + 1)
        player.disconnect()
    })
    it('Should move down', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player)
        player.room.game.engines[player.name].clean()
        const engine = player.room.game.engines.player
        const currentPoint = [4, 4]
        engine.piece.point = [4, 4]
        engine.piece.shape = SHAPE_J_1
        engine.piece.move(MOVE_DOWN)
        expect(engine.piece.point[1]).to.equal(currentPoint[1] + 1)
        player.disconnect()
    })
    it('Should move deep down', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player)
        player.room.game.engines[player.name].clean()
        const engine = player.room.game.engines.player
        engine.piece.point = [4, 4]
        engine.piece.shape = SHAPE_J_1
        engine.piece.move(MOVE_DEEP_DOWN)
        expect(engine.piece.point[1]).to.equal(-1)
        player.disconnect()
    })
    it('Should invoke engine.next', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player)
        player.room.game.engines[player.name].clean()
        const engine = player.room.game.engines.player
        const currentShape = engine.piece.shape
        engine.piece.point = [4, PLAYGROUND_HEIGHT]
        engine.piece.shape = SHAPE_J_1
        engine.piece.move(MOVE_DOWN)
        expect(currentShape).not.equal(engine.piece.shape)
        player.disconnect()
    })
})
