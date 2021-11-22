const expect = require('chai').expect
const Game = require('../game.class')
const Room = require('../room.class')
const Player = require('../player.class')


describe('Game', () => {
    const data = {}
    it('create game without params', () => {
        expect(() => new Game()).to.throw('incorrect room')
    })
    it('create game successfully', () => {
        data.player = new Player('randomPlayer')
        data.room = new Room(data.player, 'randomRoom', {})
        data.game = new Game(data.room)
        expect(data.game).to.instanceOf(Game)
    })
    it('start game', () => {
        data.room.listener = () => 0
        data.game.start()
        expect(data.game.isStarted).to.equal(true)
    })
    it('pause game', () => {
        data.game.pause()
        expect(data.game.isPaused).to.equal(true)
    })
    it('restart game', () => {
        data.game.pause()
        expect(data.game.isStarted).to.equal(true)
    })
    it('quit game', () => {
        data.game.quit()
        expect(data.game.isStarted).to.equal(true)
    })
})