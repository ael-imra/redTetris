const io = require('socket.io-client')
const expect = require('chai').expect

function connect(name) {
    return io.connect('http://localhost:3000', {
        transportOptions: {
            polling: {
                extraHeaders: {
                    'Cookie': `name=${name}`
                }
            }
        },
        'reconnection delay': 0
        , 'reopen delay': 0
        , 'force new connection': true
    });
}

describe('socket io', () => {
    let socket = null
    beforeEach((done) => {
        socket = connect('world')
        socket.on('connect', () => {
            done()
        })
        socket.on('handle error', (error) => console.log('error: ', error))
    })
    afterEach(done => {
        if (socket && socket.connected) {
            socket.disconnect()
        }
        done()
    })
    it('create room', (done) => {
        socket.on('room joined', (room) => {
            expect(room).to.instanceOf(Object)
            expect(room).to.ownProperty('hosted')
            expect(room).to.ownProperty('name')
            expect(room).to.ownProperty('players')
            expect(room).to.ownProperty('messages')
            expect(room.messages).to.instanceOf(Array)
            expect(room).to.ownProperty('options')
            done()
        })
        socket.emit('create room', 'room3', {})
    })
    it('list rooms', (done) => {
        socket.on('list rooms', (rooms) => {
            expect(rooms).to.instanceOf(Object)
            expect(rooms).to.haveOwnProperty('data')
            expect(rooms.data).to.instanceOf(Array)
            if (rooms.data.length > 0) {
                expect(rooms.data[0]).to.haveOwnProperty('maxPlayer')
                expect(rooms.data[0]).to.haveOwnProperty('countPlayer')
                expect(rooms.data[0]).to.haveOwnProperty('name')
            }
            expect(rooms).to.haveOwnProperty('next')
            expect(rooms).to.haveOwnProperty('limit')
            expect(rooms).to.haveOwnProperty('page')
            done()
        })
        socket.emit('list rooms', '', 0, 2)
    })
    it('join room', (done) => {
        socket.on('room joined', (room) => {
            expect(room).to.instanceOf(Object)
            expect(room).to.ownProperty('name')
            expect(room).to.ownProperty('hosted')
            expect(room).to.ownProperty('players')
            expect(room).to.ownProperty('messages')
            expect(room.messages).to.instanceOf(Array)
            expect(room).to.ownProperty('options')
            done()
        })
        socket.emit('join room', 'room1')
    })
    it('exit room player not the host', (done) => {
        socket.on('room joined', () => {
            socket.on('room exited', () => {
                done()
            })
            socket.emit('exit room')
        })
        socket.emit('join room', 'room1')
    })
    it('exit room player the host', (done) => {
        socket.on('room joined', () => {
            socket.on('room exited', () => {
                done()
            })
            socket.emit('exit room')
        })
        socket.emit('create room', 'room4', {})
    })
    it('start game multi players', (done) => {
        socket.on('room joined', () => {
            const newsocket = connect('hello')
            newsocket.on('room joined', () => {
                socket.on('game started', () => {
                    let player = null
                    socket.on('piece moved', (info) => {
                        expect(info).to.haveOwnProperty('point')
                        expect(info.point).to.instanceOf(Array)
                        expect(info).to.haveOwnProperty('player')
                        if (player) expect(player).to.not.equal(info.player)
                        if (player && player !== info.player) {
                            newsocket.disconnect()
                            done()
                        }
                        if (!player) player = info.player
                    })
                })
                socket.emit('start game')
            })
            newsocket.emit('join room', 'room5')
        })
        socket.emit('create room', 'room5', { mode: 'multi' })
    })
    it('start game single player', (done) => {
        socket.on('room joined', () => {
            socket.on('game started', () => {
                socket.on('piece moved', (info) => {
                    expect(info).to.haveOwnProperty('point')
                    expect(info.point).to.instanceOf(Array)
                    expect(info).to.haveOwnProperty('player')
                    done()
                })
            })
            socket.emit('start game')
        })
        socket.emit('create room', 'room5', { mode: 'single' })
    })
    it('move piece', (done) => {
        socket.on('room joined', () => {
            socket.on('game started', () => {
                let enter = false
                const points = []
                socket.on('piece moved', (info) => {
                    points.push(info.point)
                    if (!enter) {
                        enter = true
                        socket.emit('move piece', 39)
                    } else {
                        expect(points).to.length(2)
                        expect(points[0]).to.instanceOf(Object)
                        expect(points[1]).to.instanceOf(Object)
                        expect(points[0][1]).to.equal(points[1][1])
                        expect(points[0][0]).to.not.equal(points[1][0])
                        done()
                    }
                })
            })
            socket.emit('start game')
        })
        socket.emit('create room', 'room5', { mode: 'single' })
    })
    it('kick player', (done) => {
        socket.on('room joined', () => {
            const newSocket = connect('hello')
            newSocket.on('room joined', () => {
                socket.on('message', (msg) => {
                    expect(msg).to.haveOwnProperty('name')
                    expect(msg).to.haveOwnProperty('message')
                })
                newSocket.on('room exited', () => {
                    newSocket.disconnect()
                    done()
                })
                socket.emit('kick', 'hello')
            })
            newSocket.emit('join room', 'room5')
        })
        socket.emit('create room', 'room5', { mode: 'multi' })
    })
    it('send message', (done) => {
        socket.on('room joined', () => {
            const newSocket = connect('hello')
            newSocket.on('room joined', () => {
                socket.on('message', (msg) => {
                    expect(msg).to.haveOwnProperty('name')
                    expect(msg).to.haveOwnProperty('message')
                })
                newSocket.on('message', (msg) => {
                    expect(msg).to.haveOwnProperty('name')
                    expect(msg).to.haveOwnProperty('message')
                    newSocket.disconnect()
                    done()
                })
                socket.emit('message', 'hello world')
            })
            newSocket.emit('join room', 'room5')
        })
        socket.emit('create room', 'room5', { mode: 'multi' })
    })
})