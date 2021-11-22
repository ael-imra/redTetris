const Player = require('./player.class')
const Room = require('./room.class')
const SHAPES = require('./shapes')
const PLAYGROUND_HEIGHT = 20
const PLAYGROUND_WIDTH = 10

const MOVE_UP = 38;
const MOVE_DOWN = 40;
const MOVE_LEFT = 37;
const MOVE_RIGHT = 39;
const MOVE_DEEP_DOWN = 32;
let i = 0

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY)
    process.stdin.setRawMode(true);



const player = new Player('player')
const room = new Room(player, 'room', { mode: 'single' })
let globalInfo = null
room.startGame(player, (event, player) => {
    const info = room.game.engines[player.name].generateInfo(event)
    // console.log(event, info)
    if (event === 'piece completed')
        globalInfo = info
    else if (globalInfo) {
        draw(SHAPES[info.shape](...info.point), SHAPES[info.shape](info.point[0], info.shadow))
    }

})

process.stdin.on('keypress', (str, key) => {
    if ((key.ctrl && key.name === 'c') || key.name === 'escape') {
        process.exit();
    } else if (room && room.game && room.game.engines[player.name]) {
        const engine = room.game.engines[player.name]
        if (key.name === 'down')
            engine.movePiece(MOVE_DOWN)
        else if (key.name === 'left')
            engine.movePiece(MOVE_LEFT)
        else if (key.name === 'right')
            engine.movePiece(MOVE_RIGHT)
        else if (key.name === 'up')
            engine.movePiece(MOVE_UP)
        else if (key.name === 'space')
            engine.movePiece(MOVE_DEEP_DOWN)
    }
});

function draw(data, data1) {
    console.clear()
    const pi = JSON.parse(JSON.stringify(globalInfo.field))
    for (const map of data.map) {
        if (map.y < PLAYGROUND_HEIGHT && map.y >= 0 && map.x >= 0 && map.x < PLAYGROUND_WIDTH && pi[map.y] && pi[map.y][map.x] === 0)
            pi[map.y][map.x] = 1
    }
    for (const map of data1.map) {
        if (map.y < PLAYGROUND_HEIGHT && map.y >= 0 && map.x >= 0 && map.x < PLAYGROUND_WIDTH && pi[map.y] && pi[map.y][map.x] === 0)
            pi[map.y][map.x] = 6
    }
    for (const line of pi)
        console.log(line.toString().replace(/,/g, '').replace(/0/g, '-').replace(/[1-5]/g, '#').replace(/6/g, '`'))
    console.log('\n')
}


// const shapes = require('./shapes')

// function drawShape(s, w, h) {
//     const fields = new Array(h)
//     for (let i = 0; i < h; i++) {
//         fields[i] = new Array(w)
//         fields[i].fill(0)
//     }

//     const shape = shapes[s]
//     const point = [1, 1]
//     const data = shape(...point)
//     for (const map of data.map)
//         fields[map.y][map.x] = 1

//     for (const field of fields)
//         console.log(field.toString().replace(/,/g, '').replace(/1/g, '#').replace(/0/g, '-'))
//     console.log('\n')
// }