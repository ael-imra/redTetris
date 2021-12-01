const chai = require('chai')
const chaiHttp = require('chai-http')
const App = require('../classes/app.class')
const { HOST, CLIENT_DIR } = require('../configs')
const { pJoin } = require('../utils')
const { FOLDER_NOT_FOUND } = require('../utils/errors')

chai.use(chaiHttp)
const app = new App(pJoin(__dirname, '..', CLIENT_DIR))
let headers = {}
describe('App Class', () => {
    beforeEach((done) => {
        app.serve(7979, done)
    })
    afterEach((done) => {
        app.close(done)
    })
    it('create new instance of App', (done) => {
        chai.expect(() => new App('incorrectFolder')).to.throw(FOLDER_NOT_FOUND)
        chai.expect(new App()).to.instanceOf(App)
        chai.expect(new App('.', { index: 'index.html' })).to.instanceOf(App)
        chai.expect(new App('.', { index: 'index.html', cache: 4800 })).to.instanceOf(App)
        done()
    })
    it('get request to /', (done) => {
        chai.request(`http://${HOST}:7979`).get('/').end((err, res) => {
            chai.expect(res).to.have.status(200)
            chai.expect(res).to.have.header('content-type', 'text/html')
            headers = res.headers
            done()
        })
    })
    it('get request to / with if-modified-since', (done) => {
        chai.request(`http://${HOST}:7979`).get('/').set('if-modified-since', headers['last-modified']).end((err, res) => {
            chai.expect(res).to.have.status(304)
            done()
        })
    })
    it('get request to /test/test', (done) => {
        chai.request(`http://${HOST}:7979/test/test`).get('/').end((err, res) => {
            chai.expect(res).to.have.status(200)
            chai.expect(res).to.have.header('content-type', 'text/html')
            done()
        })
    })
    it('get request to /test/test.txt', (done) => {
        chai.request(`http://${HOST}:7979/test/test.txt`).get('/').end((err, res) => {
            chai.expect(res).to.have.status(200)
            chai.expect(res).to.have.header('content-type', 'text/html')
            done()
        })
    })
    it('Method not Allowed', (done) => {
        chai.request(`http://${HOST}:7979`).post('/').end((err, res) => {
            chai.expect(res).to.have.status(405)
            done()
        })
    })
    it('Forbidden', (done) => {
        chai.request(`http://${HOST}:7979/../utils`).get('/').end((err, res) => {
            chai.expect(res).to.have.status(403)
            done()
        })
    })
    it('handle error not instance of HTTP_ERROR', (done) => {
        app.handleError({ end: done }, new Error('not found'))
    })
    it('run serve without port', (done) => {
        app.close(() => app.serve(null, () => app.close(done)))
    })
    it('close server', (done) => {
        app.close(() => chai.request(`http://${HOST}:7979`).post('/').end((err, res) => {
            chai.expect(err).to.not.equal(null)
            done()
        }))
    })
    it('close server without callback', (done) => {
        app.close()
        done()
    })
    it('close twice at the same time', (done) => {
        app.close(() => {
            app.close()
            done()
        })
    })
})
