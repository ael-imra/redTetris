const App = require('./classes/app.class')
const Socket = require('./classes/socket.class')

const app = new App()
const socket = new Socket()
app.serve(3000, () => socket.run(app.server))