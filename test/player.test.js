const Player = require('../classes/player.class')
const Room = require('../classes/room.class')
const expect = require('chai').expect

describe('Player Class', () => {
    const data = {}
    it('Should throw incorrect name', () => {
        expect(() => new Player('n')).to.throw(
            'incorrect player name'
        )
    })
    it('Should create player with name player', () => {
        data.player = new Player('player1')
        expect(data.player).to.instanceOf(Player)
    })
    it('Should throw player name already exist', () => {
        expect(() => new Player('player1')).to.throw('player name already exist')
    })
    it('Should get player with name player1', () => {
        const player = Player.getPlayer('player1')
        expect(player).to.instanceOf(Player)
        expect(player.name).to.equal('player1')
    })
    it('Should create room throw incorrect room name', () => {
        expect(() => data.player.create()).to.throw('incorrect room name')
    })
    it('Should create room with name room1', () => {
        data.player.create('room1')
        expect(data.player.room).to.instanceOf(Room)
        expect(data.player.room.name).to.equal('room1')
    })
    it('Should not create new room for current player', () => {
        expect(data.player.create('secondRoom')).to.equal(false)
    })
    it('Should create room throw room with this name already exist', () => {
        data.newPlayer = new Player('newPlayer')
        expect(() => data.newPlayer.create('room1')).to.throw('room with this name already exist')
    })
    it('Should create with customs options', () => {
        data.pl1 = new Player('pl1')
        data.pl1.create('room3', { mode: 'multi', maxPlayers: 2 })
        expect(data.pl1.room).to.instanceOf(Room)
        expect(data.pl1.room.options).to.instanceOf(Object)
        expect(data.pl1.room.options.mode).to.equal('multi')
        expect(data.pl1.room.options.maxPlayers).to.equal(2)
    })
    it('Should join room throw player already in room', () => {
        expect(() => data.player.join('room1')).to.throw('player already in room')
    })
    it('Should join room throw can\'t join this room', () => {
        expect(() => data.newPlayer.join('room1')).to.throw('can\'t join this room')
    })
    it('Should join room create new room', () => {
        data.newPlayer.join('room2')
        expect(data.newPlayer.room).to.instanceOf(Room)
        expect(data.newPlayer.room.name).to.equal('room2')
    })
    it('Should join room with name room3', () => {
        data.player2 = new Player('player2')
        data.player2.join('room3')
        expect(data.player2.room).to.instanceOf(Room)
        expect(data.player2.room.name).to.equal('room3')
    })
    it('Should disconnect exit from room', () => {
        expect(data.player2.disconnect()).to.equal(true)
        expect(Player.getPlayer('player2')).to.equal(undefined)
    })
    it('Should disconnect remove player', () => {
        const player3 = new Player('player3')
        expect(player3.disconnect()).to.equal(true)
        expect(Player.getPlayer('player3')).to.equal(undefined)
    })
})