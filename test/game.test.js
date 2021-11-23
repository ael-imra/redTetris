const { expect } = require('chai')
const Game = require('../classes/game.class')

describe('Game Class', () => {
    it('Should not create game', () => {
        expect(() => new Game()).to.throw('incorrect room')
    })
})
