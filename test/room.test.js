const Room = require('../classes/room.class')
const Player = require('../classes/player.class')
const expect = require('chai').expect
const { MAX_PLAYERS, MIN_PLAYERS, MIN_SPEED, MAX_SPEED } = require('../configs')
const Game = require('../classes/game.class')

describe('Room Class', () => {
    it('Should throw incorrect player', () => {
        expect(() => new Room()).to.throw('incorrect player')
    })
    it('Should create room with max player', () => {
        const player = new Player('player')
        const room = new Room(player, 'room', { maxPlayers: 50, mode: 'multi' })
        player.room = room
        expect(room).to.instanceOf(Room)
        expect(room.options).to.instanceOf(Object)
        expect(room.options.maxPlayers).to.equal(MAX_PLAYERS)
        player.disconnect()
    })
    it('Should create room with min player', () => {
        const player = new Player('player')
        const room = new Room(player, 'room', { maxPlayers: -1, mode: 'multi' })
        player.room = room
        expect(room).to.instanceOf(Room)
        expect(room.options).to.instanceOf(Object)
        expect(room.options.maxPlayers).to.equal(MIN_PLAYERS)
        player.disconnect()
    })
    it('Should add to room throw incorrect player', () => {
        const player = new Player('player')
        const room = new Room(player, 'room', { maxPlayers: 2, mode: 'multi' })
        player.room = room
        expect(() => room.add()).to.throw('incorrect player')
        player.disconnect()
    })
    it('Should add to room return false', () => {
        const player = new Player('player')
        player.create('room', { maxPlayers: 2, mode: 'multi' })
        const newPlayer = new Player('newPlayer')
        player.room.add(newPlayer)
        newPlayer.room = player.room
        expect(player.room.add(new Player('testPlayer'))).to.equal(false)
        newPlayer.disconnect()
        player.disconnect()
    })
    it('Should get room information', () => {
        const player = new Player('player')
        player.create('room', { maxPlayers: 2, mode: 'multi' })
        const info = player.room.info
        expect(info).to.instanceOf(Object)
        expect(info.name).to.equal('room')
        expect(info.hosted).to.equal('player')
        expect(info.players).to.instanceOf(Array)
        expect(info.options).to.instanceOf(Object)
        player.disconnect()
    })
    it('Should change options of room', () => {
        const player = new Player('player')
        player.create('room')
        player.room.setOptions({
            mode: 'multi',
            maxPlayers: 3,
        })
        expect(player.room.options).to.instanceOf(Object)
        expect(player.room.options.mode).to.equal('multi')
        expect(player.room.options.maxPlayers).to.equal(3)
        player.disconnect()
    })
    it('Should change max players to 2 and mode to single and speed', () => {
        const player = new Player('player')
        const player2 = new Player('player2')
        const player3 = new Player('player3')
        player.create('room', { mode: 'multi', maxPlayers: 3 })
        player2.join('room')
        player3.join('room')
        player.room.setOptions({
            mode: 'single',
            maxPlayers: 2,
            speed: 100
        })
        expect(player.room.options).to.instanceOf(Object)
        expect(player.room.options.mode).to.equal('multi')
        expect(player.room.options.maxPlayers).to.equal(3)
        expect(player.room.options.speed).to.equal(MIN_SPEED)
        player.room.setOptions({
            mode: 'single',
            maxPlayers: 2,
            speed: 15000
        })
        expect(player.room.options.speed).to.equal(MAX_SPEED)
        player.disconnect()
        player2.disconnect()
        player3.disconnect()
    })
    it('Should kick player from room', () => {
        const player = new Player('player')
        player.create('room', { maxPlayers: 2, mode: 'multi' })
        const newPlayer = new Player('newPlayer')
        newPlayer.join('room')
        expect(newPlayer.room).to.instanceOf(Room)
        player.room.kick(player, newPlayer.name)
        expect(newPlayer.room).to.equal(undefined)
        newPlayer.disconnect()
        player.disconnect()
    })
    it('Should kick return false with player not exist', () => {
        const player = new Player('player')
        player.create('room', { maxPlayers: 2, mode: 'multi' })
        expect(player.room.kick(player, 'notExist')).to.equal(false)
        player.disconnect()
    })
    it('Should start game', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player, (info) => info)
        expect(player.room.game).to.instanceOf(Game)
        expect(player.room.game.isStarted).to.equal(true)
        player.disconnect()
    })
    it('Should pause game', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player, (info) => info)
        player.room.pauseGame(player)
        expect(player.room.game.isPaused).to.equal(true)
        player.room.pauseGame(player)
        expect(player.room.game.isPaused).to.equal(false)
        player.disconnect()
    })
    it('Should restart game', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player, (info) => info)
        player.room.restartGame(player)
        expect(player.room.game.isPaused).to.equal(false)
        expect(player.room.game.isStarted).to.equal(true)
        player.disconnect()
    })
    it('Should throw room need at least 2 player to start game', () => {
        const player = new Player('player')
        player.create('room', { mode: 'multi' })
        expect(() => player.room.startGame(player)).to.throw('room need at least 2 player to start game')
        player.disconnect()
    })
    it('Should throw game already started', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player, (info) => info)
        expect(() => player.room.startGame(player)).to.throw('game already started')
        player.disconnect()
    })
    it('Should startGame return false', () => {
        const player = new Player('player')
        player.create('room')
        const newPlayer = new Player('newPlayer')
        expect(player.room.startGame(newPlayer)).to.equal(false)
        newPlayer.disconnect()
        player.disconnect()
    })
    it('Should pauseGame return false', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player, (info) => info)
        player.room.game.isStarted = false
        expect(player.room.pauseGame(player)).to.equal(false)
        player.disconnect()
    })
    it('Should pauseGame return false', () => {
        const player = new Player('player')
        player.create('room')
        player.room.startGame(player, (info) => info)
        const newPlayer = new Player('newPlayer')
        expect(player.room.restartGame(newPlayer)).to.equal(false)
        newPlayer.disconnect()
        player.disconnect()
    })
    it('Should exit hosted player from room', () => {
        const player = new Player('player')
        player.create('room', { mode: 'multi' })
        const newPlayer = new Player('newPlayer')
        newPlayer.join('room')
        player.room.startGame(player, (info) => info)
        player.room.exit(player)
        expect(newPlayer.room.hosted).to.equal(newPlayer)
        player.disconnect()
        newPlayer.disconnect()
    })
    it('Should exit hosted last player of room', () => {
        const player = new Player('player')
        player.create('room')
        player.room.exit(player)
        expect(Room.getRoom('room')).to.equal(undefined)
        player.disconnect()
    })
    it('Should exit return false', () => {
        const player = new Player('player')
        player.create('room')
        expect(player.room.exit()).to.equal(false)
        player.disconnect()
    })
})
