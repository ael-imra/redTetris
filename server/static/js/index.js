// const PLAYGROUND_WIDTH = 10
// const PLAYGROUND_HEIGHT = 20
// const field = new Array(PLAYGROUND_HEIGHT)
// for (let y = 0; y < PLAYGROUND_HEIGHT; y++) {
//     field[y] = new Array(PLAYGROUND_WIDTH)
//     field[y].fill(0)
// }
// const MOVE_UP = 1
// const MOVE_DOWN = 2
// const MOVE_LEFT = 3
// const MOVE_RIGHT = 4
// let d = {
//     map: [
//         [0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0],
//     ]
// }
// function render(data) {
//     let div = ""
//     if (Array.isArray(data.map)) {
//         for (const line of data.map)
//             for (const column of line)
//                 div += `<div class="box" ${column ? "style = 'background:#ff0000'" : ""}></div>`
//     }
//     document.getElementsByClassName('container')[0].innerHTML = div
// }

// render(d)