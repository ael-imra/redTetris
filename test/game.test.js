const { expect } = require('chai')
const Game = require('../classes/game.class')
const Player = require('../classes/player.class')
const Room = require('../classes/room.class')

describe('Game Class', () => {
    it('Should not create game', () => {
        expect(() => new Game()).to.throw('incorrect room')
    })
    it('Should removePlayer return false', () => {
        const game = new Game(new Room(new Player('gameTest'), 'gameTest'))
        expect(game.removePlayer()).to.equals(false)
        game.quit()
    })
})
