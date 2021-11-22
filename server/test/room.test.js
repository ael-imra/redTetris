const expect = require('chai').expect
const Room = require('../room.class')
const Player = require('../player.class')

describe('Room', () => {
    const data = {}
    it('create room without params', () => {
        expect(() => new Room()).to.throw('incorrect player')
        const player = new Player('test')
        expect(() => new Room(player)).to.throw('name must be string and options must be object')
        expect(() => new Room(player, 'room')).to.throw('name must be string and options must be object')
    })
    it('create room with success', () => {
        data.player = new Player('player')
        data.room = new Room(data.player, 'room', { mode: 'multi' })
        expect(data.room).to.instanceOf(Room)
    })
    it('error add player to room', () => {
        expect(() => data.room.add()).to.throw('incorrect player')
    })
    it('add player with success', () => {
        data.newplayer = new Player('newplayer')
        expect(data.room.add(data.newplayer)).to.equal(true)
    })
    it('start game with player not room owner ', () => {
        expect(data.room.startGame(data.newplayer)).to.equal(false)
    })
    it('start game with player owner', () => {
        expect(data.room.startGame(data.player, () => 0)).to.equal(true)
        expect(data.room.game.isStarted).to.equal(true)
        data.room.game.quit()
    })
    it('start game with player owner', () => {
        expect(data.room.startGame(data.player, () => 0)).to.equal(true)
        expect(data.room.game.isStarted).to.equal(true)
    })
    it('pause game with player owner ', () => {
        expect(data.room.pauseGame(data.player)).to.equal(true)
        expect(data.room.game.isPaused).to.equal(true)
    })
    it('restart game with player owner ', () => {
        expect(data.room.restartGame(data.player)).to.equal(true)
        expect(data.room.game.isStarted).to.equal(true)
    })
    it('exit room with player owner ', () => {
        expect(data.room.exit(data.player)).to.equal(true)
        expect(data.player.room).to.equal(undefined)
        expect(data.room.exit(data.newplayer)).to.equal(true)
        expect(Room.rooms[data.room.name]).to.equal(undefined)
    })
})