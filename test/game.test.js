const { expect } = require('chai')
const Game = require('../classes/game.class')
const Player = require('../classes/player.class')
const Room = require('../classes/room.class')
const { PLAYGROUND_HEIGHT, PLAYGROUND_WIDTH, COLORS, COLOR_BLOCKED_LINE } = require('../configs')
const { SHAPE_L_1 } = require('../utils/shapes')

describe('Game Class', () => {
    it('Should not create game', () => {
        expect(() => new Game()).to.throw('incorrect room')
    })
    it('Should removePlayer return false', () => {
        const player = new Player('player')
        player.create('room')
        const game = new Game(player.room)
        player.room.game = game
        expect(game.removePlayer()).to.equals(false)
        player.disconnect()
    })
    it('Should Remove Line', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player)
        const game = player.room.game
        for (let i = 0; i < PLAYGROUND_WIDTH; i++)
            game.engines.player.field[PLAYGROUND_HEIGHT - 1][i] = COLORS[1]
        game.engines.player.piece.shape = SHAPE_L_1
        game.engines.player.piece.point = [4, PLAYGROUND_HEIGHT - 1]
        game.engines.player.removeCompletedLines()
        expect(game.engines.player.field[PLAYGROUND_HEIGHT - 1].toString().replace(/,/g, '')).to.equals("0".toString().repeat(PLAYGROUND_WIDTH))
        player.disconnect()
    })
    it('Should add penalty', () => {
        const player = new Player('player')
        const newPlayer = new Player('newPlayer')
        player.create('room', { mode: 'multi' })
        newPlayer.join('room')
        player.room.startGame(player, () => 0)
        const game = player.room.game
        for (let i = 0; i < PLAYGROUND_WIDTH; i++)
            game.engines.player.field[PLAYGROUND_HEIGHT - 2][i] = COLORS[1]
        for (let i = 0; i < PLAYGROUND_WIDTH; i++)
            game.engines.newPlayer.field[PLAYGROUND_HEIGHT - 1][i] = COLOR_BLOCKED_LINE
        game.engines.player.piece.shape = SHAPE_L_1
        game.engines.player.piece.point = [4, PLAYGROUND_HEIGHT - 2]
        game.engines.player.removeCompletedLines()
        expect(game.engines.newPlayer.field[PLAYGROUND_HEIGHT - 2].toString().replace(/,/g, '')).to.equals(COLOR_BLOCKED_LINE.toString().repeat(PLAYGROUND_WIDTH))
        newPlayer.disconnect()
        player.disconnect()
    })
    it('Should add penalty without listener', () => {
        const player = new Player('player')
        const newPlayer = new Player('newPlayer')
        player.create('room', { mode: 'multi' })
        newPlayer.join('room')
        player.room.startGame(player)
        const game = player.room.game
        for (let i = 0; i < PLAYGROUND_WIDTH; i++)
            game.engines.player.field[PLAYGROUND_HEIGHT - 2][i] = COLORS[1]
        for (let i = 0; i < PLAYGROUND_WIDTH; i++)
            game.engines.newPlayer.field[PLAYGROUND_HEIGHT - 1][i] = COLOR_BLOCKED_LINE
        game.engines.player.piece.shape = SHAPE_L_1
        game.engines.player.piece.point = [4, PLAYGROUND_HEIGHT - 2]
        game.engines.player.removeCompletedLines()
        expect(game.engines.newPlayer.field[PLAYGROUND_HEIGHT - 2].toString().replace(/,/g, '')).to.equals(COLOR_BLOCKED_LINE.toString().repeat(PLAYGROUND_WIDTH))
        newPlayer.disconnect()
        player.disconnect()
    })
    it('Should checkWinner', () => {
        const player = new Player('player')
        const newPlayer = new Player('newPlayer')
        player.create('room', { mode: 'multi' })
        newPlayer.join('room')
        player.room.startGame(player)
        const game = player.room.game
        game.engines.player.isFailed = true
        game.checkWinner()
        expect(game.engines.newPlayer.isWin).to.equals(true)
        game.engines.player.isFailed = false
        expect(game.checkWinner()).to.equals(false)
        player.disconnect()
        newPlayer.disconnect()
    })
})
