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
        io.on('connect', () => {
            connected = true
        })
        setTimeout(() => {
            if (!connected) {
                io.disconnect()
                done()
            }
        }, 1000)
    })
    it('Should send cookies without name', (done) => {
        let connected = false
        const io = socketClient.connect(`http://localhost:1338`, {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        Cookie: `withoutName=name`,
                    },
                },
            }
        })
        io.on('connect', () => {
            connected = true
        })
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
})
