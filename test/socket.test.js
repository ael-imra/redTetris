const Socket = require('../classes/socket.class')
const socketClient = require('socket.io-client')
const { expect } = require('chai')
const App = require('../classes/app.class')
const { MOVE_LEFT, CLIENT_DIR } = require('../configs')
const { pJoin } = require('../utils')

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
        const app = new App(pJoin(__dirname, '..', CLIENT_DIR))
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
    it('Should try to create two room', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            let joined = false
            io.on('room joined', () => {
                joined = true
            })
            setTimeout(() => {
                if (!joined) {
                    io.disconnect()
                    done()
                }
            }, 200)
            io.emit('create room', 'room2')
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
    it('Should try to join two room', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            let joined = false
            io.on('room joined', () => {
                joined = true
            })
            setTimeout(() => {
                if (!joined) {
                    io.disconnect()
                    done()
                }
            }, 200)
            io.emit('join room', 'room1')
        })
        io.emit('join room', 'room1')
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
                    expect(obj.name).to.equal('player2')
                    expect(obj.hosted).to.equal('player')
                    io.disconnect()
                    io2.disconnect()
                    done()
                })
                io.emit('kick', 'player2')
            })
            io2.emit('join room', 'room1')
        })
        io.emit('create room', 'room1', { mode: 'multi' })
    })
    it('Should try to kick incorrect player name', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            let exited = false
            io.on('player exited', () => exited = true)
            setTimeout(() => {
                if (!exited) {
                    io.disconnect()
                    done()
                }
            }, 200)
            io.emit('kick', 'er')
        })
        io.emit('create room', 'room1', { mode: 'multi' })
    })
    it('Should exit player from room1', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            io.on('room exited', () => {
                io.disconnect()
                done()
            })
            io.emit('exit room')
        })
        io.emit('create room', 'room1')
    })
    it('Should try exit twice from room1', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            io.on('room exited', () => {
                io.emit('exit room')
                setTimeout(() => {
                    io.disconnect()
                    done()
                }, 200)
            })
            io.emit('exit room')
        })
        io.emit('create room', 'room1')
    })
    it('Should send message', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            const io2 = connect(1338, 'player2')
            io2.on('room joined', () => {
                io.on('message', (msg) => {
                    expect(msg).to.instanceOf(Object)
                    expect(msg.name).to.equal('player')
                    expect(msg.message).to.equal('hello world')
                    io.disconnect()
                    io2.disconnect()
                    done()
                })
                io.emit('message', 'hello world')
            })
            io2.emit('join room', 'room1')
        })
        io.emit('create room', 'room1', { mode: 'multi' })
    })
    it('Should not send incorrect message', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            let send = false
            io.on('message', () => send = true)
            setTimeout(() => {
                if (!send) {
                    io.disconnect()
                    done()
                }
            }, 200)
            io.emit('message', '        ')
        })
        io.emit('create room', 'room1', { mode: 'multi' })
    })
    it('Should change options', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            io.on('options', (options) => {
                expect(options).to.instanceOf(Object)
                expect(options.speed).to.equal(200)
                expect(options.mode).to.equal('multi')
                io.disconnect()
                done()
            })
            io.emit('options', { mode: 'multi', speed: 200 })
        })
        io.emit('create room', 'room1')
    })
    it('Should start game', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            io.on('game started', () => {
                io.disconnect()
                done()
            })
            io.emit('start game')
        })
        io.emit('create room', 'room1')
    })
    it('Should start game throw you need to join room first', (done) => {
        const io = connect(1338, 'player')
        io.on('handle error', (error) => {
            expect(error).to.equal('you need to join room first')
            io.disconnect()
            done()
        })
        io.emit('start game')
    })
    it('Should pause game', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            io.on('game started', () => {
                io.on('game paused', () => {
                    io.disconnect()
                    done()
                })
                io.emit('pause game')
            })
            io.emit('start game')
        })
        io.emit('create room', 'room1')
    })
    it('Should pause game throw game not started yet', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            io.on('handle error', (error) => {
                expect(error).to.equal('game not started yet')
                io.disconnect()
                done()
            })
            io.emit('pause game')
        })
        io.emit('create room', 'room1')
    })
    it('Should pause game throw you need to join room first', (done) => {
        const io = connect(1338, 'player')
        io.on('handle error', (error) => {
            expect(error).to.equal('you need to join room first')
            io.disconnect()
            done()
        })
        io.emit('pause game')
    })
    it('Should restart game', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            io.on('game started', () => {
                io.on('game restarted', () => {
                    io.disconnect()
                    done()
                })
                io.emit('restart game')
            })
            io.emit('start game')
        })
        io.emit('create room', 'room1')
    })
    it('Should restart game throw game not started yet', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            io.on('handle error', (error) => {
                expect(error).to.equal('game not started yet')
                io.disconnect()
                done()
            })
            io.emit('restart game')
        })
        io.emit('create room', 'room1')
    })
    it('Should restart game throw you need to join room first', (done) => {
        const io = connect(1338, 'player')
        io.on('handle error', (error) => {
            expect(error).to.equal('you need to join room first')
            io.disconnect()
            done()
        })
        io.emit('restart game')
    })
    it('Should move piece', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            io.on('game started', () => {
                io.on('piece moved', () => {
                    io.disconnect()
                    done()
                })
                io.emit('move piece', MOVE_LEFT)
            })
            io.emit('start game')
        })
        io.emit('create room', 'room1')
    })
    it('Should move piece throw Incorrect Key', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            io.on('game started', () => {
                io.on('handle error', (error) => {
                    expect(error).to.equal('Incorrect Key')
                    io.disconnect()
                    done()
                })
                io.emit('move piece', 122)
            })
            io.emit('start game')
        })
        io.emit('create room', 'room1')
    })
    it('Should not move piece', (done) => {
        const io = connect(1338, 'player')
        io.on('room joined', () => {
            io.emit('move piece', MOVE_LEFT)
            setTimeout(() => {
                io.disconnect()
                done()
            }, 500)
        })
        io.emit('create room', 'room1')
    })
})
