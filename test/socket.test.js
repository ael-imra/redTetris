const Socket = require('../classes/socket.class')
const socketClient = require('socket.io-client')
const { expect } = require('chai')
const App = require('../classes/app.class')
const ROOT_DIR = `${__dirname}/../static`

function connect(port, name) {
    return socketClient.connect(`http://localhost:${port}`, {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Cookie: `name=${name}`,
                },
            },
        }
    })
}
describe('Socket Class', () => {
    const data = {}
    beforeEach(() => {
        data.socket = new Socket()
        data.socket.run(null, 1338)
    })
    afterEach((done) => {
        data.socket.close(done)
    })
    it('Should connect with name hello', (done) => {
        const io = connect(1338, 'hello')
        io.on('connect', () => {
            io.disconnect()
            done()
        })
    })
    it('Should not connect', (done) => {
        let connected = false
        const io = socketClient.connect('http://localhost:1338')
        io.on('connect', () => connected = true)
        setTimeout(() => {
            if (!connected) {
                io.disconnect()
                done()
            }
        }, 1000)
    })
    it('Should create socket from server', (done) => {
        const app = new App(ROOT_DIR)
        app.serve(1337, () => {
            const socket = new Socket()
            socket.run(app.server)
            const io = connect(1337, 'hello')
            io.on('connect', () => {
                io.disconnect()
                socket.close(() => app.close(() => {
                    socket.close()
                    done()
                }))
            })
        })
    })
    it('Should not listen to any port or server', () => {
        const socket = new Socket()
        socket.run()
        socket.close()
        expect(socket.io).to.equal(undefined)
    })
    it('Should create room', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', (info) => {
            expect(info.name).to.equal('room1')
            expect(info.hosted).to.equal('player')
            expect(info.players).to.instanceOf(Array)
            expect(info.players.length).to.equal(1)
            io.disconnect()
            done()
        })
        io.emit('create room', 'room1')
    })
    it('Should not join room with single mode', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            const io2 = connect(1338, 'player2')
            io2.on('handle error', (error) => {
                expect(error).to.equal("can't join this room")
                io.disconnect()
                io2.disconnect()
                done()
            })
            io2.emit('join room', 'room1')
        })
        io.emit('create room', 'room1')
    })
    it('Should join room with single mode', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', (info) => {
            const io2 = connect(1338, 'player2')
            io2.on('room joined', (info2) => {
                expect(info2.name).to.equal(info.name)
                io.disconnect()
                io2.disconnect()
                done()
            })
            io2.emit('join room', 'room1')
        })
        io.emit('create room', 'room1', { mode: 'multi' })
    })
    it('Should get one room', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            const io2 = connect(1338, 'player2')
            io2.on('room joined', () => {
                io.on('list rooms', (rooms) => {
                    expect(rooms).to.instanceOf(Object)
                    expect(rooms.data).to.instanceOf(Array)
                    expect(rooms.data.length).to.equal(1)
                    io.disconnect()
                    io2.disconnect()
                    done()
                })
                io.emit('list rooms', '', 0, 10)
            })
            io2.emit('create room', 'room2')
        })
        io.emit('create room', 'room1', { mode: 'multi', privacy: 'private' })
    })
    it('Should get 2 rooms', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            const io2 = connect(1338, 'player2')
            io2.on('room joined', () => {
                io.on('list rooms', (rooms) => {
                    expect(rooms).to.instanceOf(Object)
                    expect(rooms.data).to.instanceOf(Array)
                    expect(rooms.data.length).to.equal(2)
                    io.disconnect()
                    io2.disconnect()
                    done()
                })
                io.emit('list rooms', '', 0, 10)
            })
            io2.emit('join room', 'room2')
        })
        io.emit('create room', 'room1', { mode: 'multi' })
    })
    it('Should kick player2 from room', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            const io2 = connect(1338, 'player2')
            io2.on('room joined', () => {
                io.on('player exited', (obj) => {
                    expect(obj).to.instanceOf(Object)
                    expect(obj.name).to.instanceOf('player2')
                    expect(obj.hosted).to.instanceOf('player')
                    expect(rooms.data.length).to.equal(2)
                    io.disconnect()
                    io2.disconnect()
                    done()
                })
                io.emit('kick', 'player2')
            })
            io2.emit('join room', 'room2')
        })
        io.emit('create room', 'room1', { mode: 'multi' })
    })
})
