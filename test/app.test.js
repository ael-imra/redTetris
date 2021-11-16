const chai = require('chai')
const chaiHttp = require('chai-http')
const App = require('../classes/app.class')
const { HOST } = require('../configs')
const { pJoin } = require('../utils')
const { FOLDER_NOT_FOUND } = require('../utils/errors')

chai.use(chaiHttp)
const app = new App(pJoin(__dirname, '..', 'client', 'build'))
describe('App Class', () => {
    beforeEach((done) => {
        app.serve(7979, done)
    })
    afterEach((done) => {
        app.close(done)
    })
    it('create app with incorrect root folder', (done) => {
        chai.expect(() => new App('incorrectFolder')).to.throw(FOLDER_NOT_FOUND)
        done()
    })
    it('get request to /', (done) => {
        chai.request(`http://${HOST}:7979`).get('/').end((err, res) => {
            chai.expect(res).to.have.status(200)
            chai.expect(res).to.have.header('content-type', 'text/html')
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
    it('close server', (done) => {
        app.close(() => chai.request(`http://${HOST}:7979`).post('/').end((err, res) => {
            chai.expect(err).to.not.equal(null)
            done()
        }))
    })
})