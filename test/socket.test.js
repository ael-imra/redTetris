const Socket = require('../classes/socket.class')
const socketClient = require('socket.io-client')
const { expect } = require('chai')

function connect(name) {
    return socketClient.connect('http://localhost:1338', {
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
        const io = connect('hello')
        io.on('connect', () => {
            io.disconnect()
            done()
        })
    })
})
