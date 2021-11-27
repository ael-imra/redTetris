const { expect } = require("chai")
const Engine = require("../classes/engine.class")
const Game = require("../classes/game.class")
const Player = require("../classes/player.class")
const Room = require("../classes/room.class")
const { COLORS, PLAYGROUND_HEIGHT, MOVE_RIGHT } = require("../configs")
const shapes = require('../utils/shapes')

describe('Engine Class', () => {
    it('Should throw incorrect game', () => {
        expect(() => new Engine()).to.throw('incorrect game')
    })
    it('Should clean engine before start return false', () => {
        const player = new Player('player')
        player.create('room')
        const game = new Game(player.room)
        player.room.game = game
        const engine = new Engine(player.room.game, player)
        expect(engine.clean()).to.equal(false)
        player.disconnect()
    })
    it('Should invoke listener', (done) => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player, () => {
            player.disconnect()
            done()
        })
    })
    it('Should piece move down after 1000ms', (done) => {
        const player = new Player('player')
        player.create('room')
        let currentPoint = null
        player.room.startGame(player, (event, player) => {
            if (event === 'piece moved') {
                const engine = player.room.game.engines.player
                expect(engine.piece.point[1]).to.equal(currentPoint + 1)
                player.disconnect()
                done()
            }
        })
        currentPoint = player.room.game.engines.player.piece.point[1]
    })
    // it('Should setPiece return false', () => {
    //     const player = new Player('player')
    //     player.create('room')
    //     player.room.startGame(player, () => 0)
    //     player.room.pauseGame(player)
    //     const engine = player.room.game.engines.player
    //     console.log(engine.piece.shape(4, -4))
    //     expect(engine.setPiece(engine.piece.shape(4, -4))).to.equal(false)
    //     player.disconnect()
    // })
    it('Should invoke next with isFailed=true', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player, () => 0)
        player.room.pauseGame(player)
        const engine = player.room.game.engines.player
        engine.isFailed = true
        engine.next()
        expect(engine.interval).to.equal(null)
        player.disconnect()
    })
    it('Should generate info', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player, () => 0)
        player.room.pauseGame(player)
        const engine = new Engine(player.room.game, player)
        const pieceMovedInfo = engine.generateInfo('piece moved')
        const pieceCompletedInfo = engine.generateInfo('piece completed')
        const info = engine.generateInfo()
        console.log(engine)
        expect(pieceMovedInfo).to.instanceof(Object)
        expect(pieceMovedInfo.point).to.instanceof(Array)
        expect(pieceMovedInfo.point.length).to.equal(2)
        expect(shapes[pieceMovedInfo.shape]).not.equal(undefined)
        expect(pieceMovedInfo.shadow).to.gt(0)
        expect(pieceMovedInfo.player).to.equal(player.name)
        expect(COLORS.indexOf(pieceMovedInfo.color)).not.equal(-1)
        expect(pieceMovedInfo.score).to.equal(0)
        expect(pieceCompletedInfo).to.instanceof(Object)
        expect(pieceCompletedInfo.field).to.instanceof(Array)
        expect(shapes[pieceCompletedInfo.currentPiece]).not.equal(undefined)
        expect(shapes[pieceCompletedInfo.nextPiecePiece]).not.equal(undefined)
        expect(COLORS.indexOf(pieceCompletedInfo.currentColor)).not.equal(-1)
        expect(COLORS.indexOf(pieceCompletedInfo.nextColor)).not.equal(-1)
        expect(pieceCompletedInfo.win).to.equal(false)
        expect(pieceCompletedInfo.failed).to.equal(false)
        expect(pieceCompletedInfo.player).to.equal(player.name)
        expect(pieceMovedInfo.score).to.equal(0)
        expect(info).to.equal(null)
        player.disconnect()
    })
    it('Should not move piece', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player)
        player.room.pauseGame(player)
        const engine = player.room.game.engines.player
        engine.isFailed = true
        const currentPoint = engine.piece.point
        engine.movePiece(MOVE_RIGHT)
        expect(currentPoint[0]).to.equal(engine.piece.point[0])
        player.disconnect()
    })
    it('Should not start twice', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player)
        const engine = player.room.game.engines.player
        const interval = engine.interval
        engine.start()
        expect(engine.interval).to.equal(interval)
        player.disconnect()
    })
    it('Should generate another pieces', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player)
        const engine = player.room.game.engines.player
        const currentLength = player.room.game.pieces.length
        engine.currentPiece = currentLength - 2
        engine.next()
        expect(currentLength).not.equal(player.room.game.pieces.length)
        player.disconnect()
    })
    it('Should isFit return false', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player)
        const engine = player.room.game.engines.player
        engine.piece.shape = shapes.SHAPE_I_1
        engine.field[1].fill(COLORS[1])
        expect(engine.isFit(engine.piece.shape(4, 1))).to.equal(false)
        player.disconnect()
    })
})