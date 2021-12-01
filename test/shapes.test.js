const {
    SHAPE_I_1,
    SHAPE_I_2,
    SHAPE_I_3,
    SHAPE_I_4,
    SHAPE_J_1,
    SHAPE_J_2,
    SHAPE_J_3,
    SHAPE_J_4,
    SHAPE_L_1,
    SHAPE_L_2,
    SHAPE_L_3,
    SHAPE_L_4,
    SHAPE_O,
    SHAPE_S_1,
    SHAPE_S_2,
    SHAPE_S_3,
    SHAPE_S_4,
    SHAPE_T_1,
    SHAPE_T_2,
    SHAPE_T_3,
    SHAPE_T_4,
    SHAPE_Z_1,
    SHAPE_Z_2,
    SHAPE_Z_3,
    SHAPE_Z_4,
} = require('../utils/shapes')
const expect = require('chai').expect

function creatField(size) {
    const field = new Array(size)
    for (let i = 0; i < size; i++) {
        field[i] = new Array(size)
        field[i].fill(0)
    }
    return field
}
function fill(field, data) {
    for (const map of data.map)
        field[map.y][map.x] = 1
}
function checkFill(field, points) {
    for (const point of points) {
        if (field[point[0]][point[1]] === 0)
            return false
    }
    return true
}

describe('Shapes', () => {
    it('SHAPE_I_1', () => {
        const field = creatField(4)
        fill(field, SHAPE_I_1(1, 1))
        expect(checkFill(field, [[1, 2], [1, 1], [1, 2], [1, 3]])).to.be.equal(true)
        expect(SHAPE_I_1.switch).to.be.equal(SHAPE_I_2)
    })
    it('SHAPE_I_2', () => {
        const field = creatField(4)
        fill(field, SHAPE_I_2(1, 1))
        expect(checkFill(field, [[0, 2], [1, 2], [2, 2], [3, 2]])).to.be.equal(true)
        expect(SHAPE_I_2.switch).to.be.equal(SHAPE_I_3)
    })
    it('SHAPE_I_3', () => {
        const field = creatField(4)
        fill(field, SHAPE_I_3(1, 1))
        expect(checkFill(field, [[2, 0], [2, 1], [2, 2], [2, 3]])).to.be.equal(true)
        expect(SHAPE_I_3.switch).to.be.equal(SHAPE_I_4)
    })
    it('SHAPE_I_4', () => {
        const field = creatField(4)
        fill(field, SHAPE_I_4(1, 1))
        expect(checkFill(field, [[0, 1], [1, 1], [2, 1], [3, 1]])).to.be.equal(true)
        expect(SHAPE_I_4.switch).to.be.equal(SHAPE_I_1)
    })
    it('SHAPE_J_1', () => {
        const field = creatField(3)
        fill(field, SHAPE_J_1(1, 1))
        expect(checkFill(field, [[0, 0], [1, 0], [1, 1], [1, 2]])).to.be.equal(true)
        expect(SHAPE_J_1.switch).to.be.equal(SHAPE_J_2)
    })
    it('SHAPE_J_2', () => {
        const field = creatField(3)
        fill(field, SHAPE_J_2(1, 1))
        expect(checkFill(field, [[0, 1], [0, 2], [1, 1], [2, 1]])).to.be.equal(true)
        expect(SHAPE_J_2.switch).to.be.equal(SHAPE_J_3)
    })
    it('SHAPE_J_3', () => {
        const field = creatField(3)
        fill(field, SHAPE_J_3(1, 1))
        expect(checkFill(field, [[1, 0], [1, 1], [1, 2], [2, 2]])).to.be.equal(true)
        expect(SHAPE_J_3.switch).to.be.equal(SHAPE_J_4)
    })
    it('SHAPE_J_4', () => {
        const field = creatField(3)
        fill(field, SHAPE_J_4(1, 1))
        expect(checkFill(field, [[0, 1], [1, 1], [2, 1], [2, 0]])).to.be.equal(true)
        expect(SHAPE_J_4.switch).to.be.equal(SHAPE_J_1)
    })
    it('SHAPE_L_1', () => {
        const field = creatField(3)
        fill(field, SHAPE_L_1(1, 1))
        expect(checkFill(field, [[1, 0], [1, 1], [1, 2], [0, 2]])).to.be.equal(true)
        expect(SHAPE_L_1.switch).to.be.equal(SHAPE_L_2)
    })
    it('SHAPE_L_2', () => {
        const field = creatField(3)
        fill(field, SHAPE_L_2(1, 1))
        expect(checkFill(field, [[0, 1], [1, 1], [2, 1], [2, 2]])).to.be.equal(true)
        expect(SHAPE_L_2.switch).to.be.equal(SHAPE_L_3)
    })
    it('SHAPE_L_3', () => {
        const field = creatField(3)
        fill(field, SHAPE_L_3(1, 1))
        expect(checkFill(field, [[2, 0], [1, 0], [1, 1], [1, 2]])).to.be.equal(true)
        expect(SHAPE_L_3.switch).to.be.equal(SHAPE_L_4)
    })
    it('SHAPE_L_4', () => {
        const field = creatField(3)
        fill(field, SHAPE_L_4(1, 1))
        expect(checkFill(field, [[0, 0], [0, 1], [1, 1], [2, 1]])).to.be.equal(true)
        expect(SHAPE_L_4.switch).to.be.equal(SHAPE_L_1)
    })
    it('SHAPE_O', () => {
        const field = creatField(4)
        fill(field, SHAPE_O(1, 1))
        expect(checkFill(field, [[0, 1], [0, 1], [1, 2], [1, 2]])).to.be.equal(true)
        expect(SHAPE_O.switch).to.be.equal(SHAPE_O)
    })
    it('SHAPE_S_1', () => {
        const field = creatField(4)
        fill(field, SHAPE_S_1(1, 1))
        expect(checkFill(field, [[1, 0], [1, 1], [0, 1], [0, 2]])).to.be.equal(true)
        expect(SHAPE_S_1.switch).to.be.equal(SHAPE_S_2)
    })
    it('SHAPE_S_2', () => {
        const field = creatField(4)
        fill(field, SHAPE_S_2(1, 1))
        expect(checkFill(field, [[0, 1], [1, 1], [1, 2], [2, 2]])).to.be.equal(true)
        expect(SHAPE_S_2.switch).to.be.equal(SHAPE_S_3)
    })
    it('SHAPE_S_3', () => {
        const field = creatField(4)
        fill(field, SHAPE_S_3(1, 1))
        expect(checkFill(field, [[2, 0], [2, 1], [1, 1], [1, 2]])).to.be.equal(true)
        expect(SHAPE_S_3.switch).to.be.equal(SHAPE_S_4)
    })
    it('SHAPE_S_4', () => {
        const field = creatField(4)
        fill(field, SHAPE_S_4(1, 1))
        expect(checkFill(field, [[0, 0], [1, 0], [1, 1], [2, 1]])).to.be.equal(true)
        expect(SHAPE_S_4.switch).to.be.equal(SHAPE_S_1)
    })
    it('SHAPE_T_1', () => {
        const field = creatField(4)
        fill(field, SHAPE_T_1(1, 1))
        expect(checkFill(field, [[0, 1], [1, 0], [1, 1], [1, 2]])).to.be.equal(true)
        expect(SHAPE_T_1.switch).to.be.equal(SHAPE_T_2)
    })
    it('SHAPE_T_2', () => {
        const field = creatField(4)
        fill(field, SHAPE_T_2(1, 1))
        expect(checkFill(field, [[0, 1], [1, 1], [2, 1], [1, 2]])).to.be.equal(true)
        expect(SHAPE_T_2.switch).to.be.equal(SHAPE_T_3)
    })
    it('SHAPE_T_3', () => {
        const field = creatField(4)
        fill(field, SHAPE_T_3(1, 1))
        expect(checkFill(field, [[1, 0], [1, 1], [1, 2], [2, 1]])).to.be.equal(true)
        expect(SHAPE_T_3.switch).to.be.equal(SHAPE_T_4)
    })
    it('SHAPE_T_4', () => {
        const field = creatField(4)
        fill(field, SHAPE_T_4(1, 1))
        expect(checkFill(field, [[1, 0], [0, 1], [1, 1], [2, 1]])).to.be.equal(true)
        expect(SHAPE_T_4.switch).to.be.equal(SHAPE_T_1)
    })
    it('SHAPE_Z_1', () => {
        const field = creatField(4)
        fill(field, SHAPE_Z_1(1, 1))
        expect(checkFill(field, [[0, 0], [0, 1], [1, 1], [1, 2]])).to.be.equal(true)
        expect(SHAPE_Z_1.switch).to.be.equal(SHAPE_Z_2)
    })
    it('SHAPE_Z_2', () => {
        const field = creatField(4)
        fill(field, SHAPE_Z_2(1, 1))
        expect(checkFill(field, [[0, 2], [1, 2], [1, 1], [2, 1]])).to.be.equal(true)
        expect(SHAPE_Z_2.switch).to.be.equal(SHAPE_Z_3)
    })
    it('SHAPE_Z_3', () => {
        const field = creatField(4)
        fill(field, SHAPE_Z_3(1, 1))
        expect(checkFill(field, [[1, 0], [1, 1], [2, 1], [2, 2]])).to.be.equal(true)
        expect(SHAPE_Z_3.switch).to.be.equal(SHAPE_Z_4)
    })
    it('SHAPE_Z_4', () => {
        const field = creatField(4)
        fill(field, SHAPE_Z_4(1, 1))
        expect(checkFill(field, [[0, 1], [1, 1], [1, 0], [2, 0]])).to.be.equal(true)
        expect(SHAPE_Z_4.switch).to.be.equal(SHAPE_Z_1)
    })
})