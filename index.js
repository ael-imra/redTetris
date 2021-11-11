const App = require('./classes/app.class')


const app = new App(`${__dirname}/test/client/build`, { index: 'index.html' })
app.serve(1337)