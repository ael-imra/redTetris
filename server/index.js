// const PLAYGROUND_WIDTH = 6
// const PLAYGROUND_HEIGHT = 18
// const SHAPES = require('./shapes')
// const MOVE_UP = 1
// const MOVE_DOWN = 2
// const MOVE_LEFT = 3
// const MOVE_RIGHT = 4


// const io = require('socket.io')(3000, {
//     transports: ['websocket', 'polling'],
//     cors: {
//         origin: true,
//         credentials: true,
//     },
// })

// const obj = {

// }
// io.on('connect', (socket) => {
//     engine.start()
//     obj.socket = socket
//     console.log('started')
//     socket.on('move', (key) => {
//         if (engine && engine.pieces) {
//             const piece = engine.pieces[engine.currentPiece]
//             if (key.name === 'down')
//                 piece.move(MOVE_DOWN)
//             else if (key.name === 'left')
//                 piece.move(MOVE_LEFT)
//             else if (key.name === 'right')
//                 piece.move(MOVE_RIGHT)
//             else if (key.name === 'up')
//                 piece.move(MOVE_UP)
//         }
//     })
// })
// const readline = require('readline');
// readline.emitKeypressEvents(process.stdin);
// if (process.stdin.isTTY)
//     process.stdin.setRawMode(true);
// class Engine {
//     constructor(pieces) {
//         this.currentPiece = 0
//         this.pieces = pieces
//         this.isFailed = false
//         this.field = new Array(PLAYGROUND_HEIGHT)
//         for (let y = 0; y < PLAYGROUND_HEIGHT; y++) {
//             this.field[y] = new Array(PLAYGROUND_WIDTH)
//             this.field[y].fill(0)
//         }
//     }
//     start() {
//         if (!this.isStarted) {
//             this.isStarted = true
//             this.interval = setInterval(() => {
//                 const piece = this.pieces[this.currentPiece]
//                 console.log('piece')
//                 piece.move(MOVE_DOWN)
//             }, 1000)
//         }

//         // process.stdin.on('keypress', (str, key) => {
//         //     if ((key.ctrl && key.name === 'c') || key.name === 'escape') {
//         //         process.exit();
//         //     } else {
//         //         const piece = this.pieces[this.currentPiece]
//         //         if (key.name === 'down')
//         //             piece.move(MOVE_DOWN)
//         //         else if (key.name === 'left')
//         //             piece.move(MOVE_LEFT)
//         //         else if (key.name === 'right')
//         //             piece.move(MOVE_RIGHT)
//         //         else if (key.name === 'up')
//         //             piece.move(MOVE_UP)
//         //     }
//         // });
//     }
//     isFit(map) {
//         if (map.max.y >= PLAYGROUND_HEIGHT || map.min.x < 0 || map.max.x >= PLAYGROUND_WIDTH) return false
//         for (const point of map.map) {
//             if (point.y >= 0) {
//                 if (this.field[point.y][point.x] === 1) return false
//             }
//         }
//         return true
//     }
//     setPiece(map) {
//         for (const point of map.map)
//             if (point.y < PLAYGROUND_HEIGHT && point.y >= 0 && point.x >= 0 && point.x < PLAYGROUND_WIDTH && this.field[point.y][point.x] !== 1)
//                 this.field[point.y][point.x] = 1
//         this.removeCompletedLines()
//     }
//     removeCompletedLines() {
//         if (!this.isFailed) {
//             const piece = this.pieces[this.currentPiece]
//             const point = piece.shape(...piece.point)
//             for (let y = point.min.y; y <= point.max.y; y++) {
//                 const line = [...this.field[y]]
//                 for (const p of point.map)
//                     if (p.y === y)
//                         line[p.x] = 1
//                 if (this.checkLine(line)) {
//                     this.field.splice(y, 1)
//                     this.field.unshift(new Array(PLAYGROUND_WIDTH))
//                     this.field[0].fill(0)
//                 }
//             }
//         }
//     }
//     checkFailed() {
//         const piece = this.pieces[this.currentPiece]
//         const shape = piece.shape(...piece.point)
//         if (shape.min.y < 0) return true
//         return false
//     }
//     checkLine(line) {
//         for (const column of line)
//             if (!column) return false
//         return true
//     }
// draw(data) {
//     console.clear()
//     if (this.isFailed)
//         console.log('FAILED!!!!!\n')
//     const pi = JSON.parse(JSON.stringify(this.field))
//     if (data && data.map)
//         for (const map of data.map) {
//             if (map.y < PLAYGROUND_HEIGHT && map.y >= 0 && map.x >= 0 && map.x < PLAYGROUND_WIDTH && pi[map.y] && pi[map.y][map.x] !== 1)
//                 pi[map.y][map.x] = 1
//         }
//     for (const line of pi)
//         console.log(line.toString().replace(/,/g, '').replace(/0/g, '-').replace(/1/g, '#'))
//     console.log('\n')
// }
// }
// // class Piece {
// //     constructor(engine, shape) {
// //         if (!engine || !(engine instanceof Engine)) throw new Error('engine required')
// //         this.point = [parseInt(PLAYGROUND_WIDTH / 2) - 1, 0]
// //         this.shape = SHAPES[shape] || SHAPES[this.random()]
// //         this.isDone = false
// //         this.engine = engine
// //     }
// //     move(key) {
// //         if (!this.engine.isFailed) {
// //             if (key === MOVE_UP && this.engine.isFit(this.shape.switch(...this.point)))
// //                 this.shape = this.shape.switch
// //             else if (key === MOVE_DOWN && this.engine.isFit(this.shape(this.point[0], this.point[1] + 1)))
// //                 this.point[1] += 1
// //             else if (key === MOVE_LEFT && this.engine.isFit(this.shape(this.point[0] - 1, this.point[1])))
// //                 this.point[0] -= 1
// //             else if (key === MOVE_RIGHT && this.engine.isFit(this.shape(this.point[0] + 1, this.point[1])))
// //                 this.point[0] += 1
// //             else if (!this.engine.isFit(this.shape(this.point[0], this.point[1] + 1))) {
// //                 this.engine.isFailed = this.engine.checkFailed()
// //                 this.engine.setPiece(this.shape(...this.point))
// //                 this.engine.currentPiece++
// //             }
// //             const sendPieces = () => {
// //                 const pi = JSON.parse(JSON.stringify(this.engine.field))
// //                 const data = this.shape(...this.point)
// //                 if (data && data.map)
// //                     for (const map of data.map) {
// //                         if (map.y < PLAYGROUND_HEIGHT && map.y >= 0 && map.x >= 0 && map.x < PLAYGROUND_WIDTH && pi[map.y] && pi[map.y][map.x] !== 1)
// //                             pi[map.y][map.x] = 1
// //                     }
// //                 return JSON.stringify({
// //                     map: pi
// //                 })
// //             }
// //             console.log(obj, 'socket')
// //             if (obj.socket) {
// //                 console.log('piece sent')
// //                 obj.socket.emit('piece info', sendPieces())
// //             }
// //         }
// //         // this.engine.draw(this.isDone ? null : this.shape(...this.point))
// //     }
// //     random() {
// //         const keys = Object.keys(SHAPES)
// //         return keys[parseInt(Math.random() * keys.length)]
// //     }
// // }

// const pieces = []
// const engine = new Engine(pieces)
// for (let i = 0; i < 100; i++)
//     pieces.push(new Piece(engine))



const App = require('./app.class')
const Player = require('./player.class')
const Room = require('./room.class')
const ROOT_DIRECTORY = '/static'

const app = new App(ROOT_DIRECTORY)
app.createSocket(3000)
app.run()
const player1 = new Player('player1')
const player2 = new Player('player2')
const player3 = new Player('player3')
const room1 = new Room(player1, 'room1', { mode: 'multi' })
const room2 = new Room(player2, 'room2', { mode: 'multi' })
player3.join('room2')