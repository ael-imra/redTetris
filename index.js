const App = require('./classes/app.class')
const Socket = require('./classes/socket.class')
const { CLIENT_DIR } = require('./configs')
const { pJoin } = require('./utils')

const app = new App(pJoin(__dirname, CLIENT_DIR))
const socket = new Socket()
app.serve(3000, () => socket.run(app.server))