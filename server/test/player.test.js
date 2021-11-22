const Player = require('../player.class');
const Room = require('../room.class');
const expect = require('chai').expect

describe('Player', () => {
    const data = {}

    it('create player with wrong name', () => {
        expect(() => new Player(1234)).to.throw('incorrect name')
    })
    it('create player with success', () => {
        data.player = new Player('test')
        expect(data.player).to.instanceof(Player)
    })
    it('create player with existed name', () => {
        expect(() => new Player('test')).to.throw('name already exist')
    })
    it('join room not exist', () => {
        data.nPlayer = new Player('nPlayer')
        data.nPlayer.join('notfound')
        expect(data.nPlayer.room).to.instanceOf(Room)
    })
    it('create room with missing two parameters', () => {
        expect(() => data.player.create()).to.throw('name must be string and options must be object')
    })
    it('create room with missing one parameters', () => {
        expect(() => data.player.create('name')).to.throw('name must be string and options must be object')
    })
    it('create room with success', () => {
        data.player.create('name', {})
        expect(data.player.room).to.instanceof(Room)
    })
    it('disconnect', () => {
        const room = data.player.room
        data.player.disconnect()
        if (room.hosted === data.player)
            expect(Room.getRoom(room.name)).be.undefined
        else {
            expect(Room.getRoom(room.name)).to.instanceof(Room)
            expect(Room.getRoom(room.name).players[data.player.name]).to.be.undefined
        }
    })
    it('join room with success', () => {
        data.newPlayer = new Player('new player')
        new Room(data.newPlayer, 'new room', { mode: 'multi' })
        data.player.join('new room')
        expect(data.player.room).to.instanceOf(Room)
    })
});