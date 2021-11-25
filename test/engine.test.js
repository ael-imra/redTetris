const { expect } = require("chai")
const Engine = require("../classes/engine.class")
const Game = require("../classes/game.class")
const Player = require("../classes/player.class")
const Room = require("../classes/room.class")

describe('Engine Class', () => {
    it('Should throw incorrect game', () => {
        expect(() => new Engine()).to.throw('incorrect game')
    })
    it('Should clean engine before start return false', () => {
        const player = new Player('testEngine')
        const game = new Game(new Room(player, 'testEngine'))
        const engine = new Engine(game, player)
        expect(engine.clean()).to.equal(false)
    })
})