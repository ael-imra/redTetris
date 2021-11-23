const Room = require('../classes/room.class')
const Player = require('../classes/player.class')
const expect = require('chai').expect
const { MAX_PLAYERS, MIN_PLAYERS } = require('../configs')

describe('Room Class', () => {
    const data = {}
    it('Should throw incorrect player', () => {
        expect(() => new Room()).to.throw('incorrect player')
    })
    it('Should create room with max player', () => {
        data.player4 = new Player('player4')
        data.room4 = new Room(data.player4, 'room4', { maxPlayers: 50, mode: 'multi' })
        expect(data.room4).to.instanceOf(Room)
        expect(data.room4.options).to.instanceOf(Object)
        expect(data.room4.options.maxPlayers).to.equal(MAX_PLAYERS)
    })
    it('Should create room with min player', () => {
        data.player5 = new Player('player5')
        data.room5 = new Room(data.player5, 'room5', { maxPlayers: -1, mode: 'multi' })
        expect(data.room5).to.instanceOf(Room)
        expect(data.room5.options).to.instanceOf(Object)
        expect(data.room5.options.maxPlayers).to.equal(MIN_PLAYERS)
    })
    it('Should add to room throw incorrect player', () => {
        expect(() => data.room4.add()).to.throw('incorrect player')
    })
    it('Should add to room return false', () => {
        data.player6 = new Player('player6')
        data.player6.room = data.room5
        data.room5.add(data.player6)
        expect(data.room5.add(new Player('testPlayer'))).to.equal(false)
    })
    it('Should get room information', () => {
        const info = data.room5.info
        expect(info).to.instanceOf(Object)
        expect(info.name).to.equal('room5')
        expect(info.hosted).to.equal('player5')
        expect(info.players).to.instanceOf(Array)
        expect(info.options).to.instanceOf(Object)
    })
    it('Should change options of room5', () => {
        data.room5.setOptions({
            mode: 'multi',
            maxPlayers: 3,
        })
        expect(data.room5.options).to.instanceOf(Object)
        expect(data.room5.options.mode).to.equal('multi')
        expect(data.room5.options.maxPlayers).to.equal(3)
    })
    it('Should kick player from room5', () => {
        data.player7 = new Player('player7')
        data.player7.join('room5')
        expect(data.player7.room).to.instanceOf(Room)
        data.room5.kick(data.player5, data.player7.name)
        expect(data.player7.room).to.equal(undefined)
    })
    it('Should kick return false with player not exist', () => {
        expect(data.room5.kick(data.player5, 'notExist')).to.equal(false)
    })
    it('Should exit hosted player from room', () => {
        data.room5.exit(data.player5)
        expect(data.room5.hosted).to.equal(data.player6)
    })
    it('Should exit hosted last player of room', () => {
        data.room5.exit(data.player6)
        expect(Room.getRoom('room5')).to.equal(undefined)
    })
    it('Should exit return false', () => {
        expect(data.room5.exit()).to.equal(false)
    })
})
