const SHAPE_I_1 = function (x, y) {
    return {
        map: [
            { x: x - 1, y },
            { x, y },
            { x: x + 1, y },
            { x: x + 2, y },
        ],
        max: { x: x + 2, y },
        min: { x: x - 1, y },
    }
}

const SHAPE_I_2 = function (x, y) {
    return {
        map: [
            { x: x + 1, y: y - 1 },
            { x: x + 1, y },
            { x: x + 1, y: y + 1 },
            { x: x + 1, y: y + 2 },
        ],
        max: { x: x + 1, y: y + 2 },
        min: { x: x + 1, y: y - 1 },
    }
}
const SHAPE_I_3 = function (x, y) {
    return {
        map: [
            { x: x - 1, y: y + 1 },
            { x, y: y + 1 },
            { x: x + 1, y: y + 1 },
            { x: x + 2, y: y + 1 },
        ],
        max: { x: x + 2, y: y + 1 },
        min: { x: x - 1, y: y + 1 },
    }
}
const SHAPE_I_4 = function (x, y) {
    return {
        map: [
            { x, y: y - 1 },
            { x, y },
            { x, y: y + 1 },
            { x, y: y + 2 },
        ],
        max: { x, y: y + 2 },
        min: { x, y: y - 1 },
    }
}

const SHAPE_L_1 = function (x, y) {
    return {
        map: [
            { x: x + 1, y: y - 1 },
            { x: x + 1, y },
            { x, y },
            { x: x - 1, y },
        ],
        max: { x: x + 1, y },
        min: { x: x - 1, y: y - 1 },
    }
}

const SHAPE_L_2 = function (x, y) {
    return {
        map: [
            { x, y: y - 1 },
            { x, y },
            { x, y: y + 1 },
            { x: x + 1, y: y + 1 },
        ],
        max: { x: x + 1, y: y + 1 },
        min: { x, y: y - 1 },
    }
}

const SHAPE_L_3 = function (x, y) {
    return {
        map: [
            { x: x - 1, y },
            { x, y },
            { x: x + 1, y },
            { x: x - 1, y: y + 1 },
        ],
        max: { x: x + 1, y: y + 1 },
        min: { x: x - 1, y },
    }
}

const SHAPE_L_4 = function (x, y) {
    return {
        map: [
            { x: x - 1, y: y - 1 },
            { x, y: y - 1 },
            { x, y },
            { x, y: y + 1 },
        ],
        max: { x, y: y + 1 },
        min: { x: x - 1, y: y - 1 },
    }
}
3
const SHAPE_J_1 = function (x, y) {
    return {
        map: [
            { x: x - 1, y: y - 1 },
            { x: x - 1, y },
            { x, y },
            { x: x + 1, y },
        ],
        max: { x: x + 1, y },
        min: { x: x - 1, y: y - 1 },
    }
}

const SHAPE_J_2 = function (x, y) {
    return {
        map: [
            { x, y: y - 1 },
            { x, y },
            { x, y: y + 1 },
            { x: x + 1, y: y - 1 },
        ],
        max: { x: x + 1, y: y + 1 },
        min: { x, y: y - 1 },
    }
}

const SHAPE_J_3 = function (x, y) {
    return {
        map: [
            { x: x - 1, y },
            { x, y },
            { x: x + 1, y },
            { x: x + 1, y: y + 1 },
        ],
        max: { x: x + 1, y: y + 1 },
        min: { x, y: y - 1 },
    }
}

const SHAPE_J_4 = function (x, y) {
    return {
        map: [
            { x, y: y - 1 },
            { x, y },
            { x, y: y + 1 },
            { x: x - 1, y: y + 1 },
        ],
        max: { x, y: y + 1 },
        min: { x: x - 1, y: y - 1 },
    }
}

const SHAPE_O = function (x, y) {
    return {
        map: [
            { x, y },
            { x: x + 1, y },
            { x, y: y - 1 },
            { x: x + 1, y: y - 1 },
        ],
        max: { x: x + 1, y },
        min: { x, y: y - 1 },
    }
}

const SHAPE_S_1 = function (x, y) {
    return {
        map: [
            { x, y: y - 1 },
            { x: x + 1, y: y - 1 },
            { x, y },
            { x: x - 1, y },
        ],
        max: { x: x + 1, y },
        min: { x: x - 1, y: y - 1 },
    }
}

const SHAPE_S_2 = function (x, y) {
    return {
        map: [
            { x, y: y - 1 },
            { x, y },
            { x: x + 1, y },
            { x: x + 1, y: y + 1 },
        ],
        max: { x: x + 1, y: y + 1 },
        min: { x, y: y - 1 },
    }
}

const SHAPE_S_3 = function (x, y) {
    return {
        map: [
            { x, y },
            { x: x + 1, y },
            { x, y: y + 1 },
            { x: x - 1, y: y + 1 },
        ],
        max: { x: x + 1, y: y + 1 },
        min: { x: x - 1, y },
    }
}

const SHAPE_S_4 = function (x, y) {
    return {
        map: [
            { x: x - 1, y: y - 1 },
            { x: x - 1, y },
            { x, y },
            { x, y: y + 1 },
        ],
        max: { x, y: y + 1 },
        min: { x: x - 1, y: y - 1 },
    }
}

const SHAPE_Z_1 = function (x, y) {
    return {
        map: [
            { x: x - 1, y: y - 1 },
            { x, y: y - 1 },
            { x, y },
            { x: x + 1, y },
        ],
        max: { x: x + 1, y },
        min: { x: x - 1, y: y - 1 },
    }
}

const SHAPE_Z_2 = function (x, y) {
    return {
        map: [
            { x: x + 1, y: y - 1 },
            { x, y },
            { x: x + 1, y },
            { x, y: y + 1 },
        ],
        max: { x: x + 1, y: y + 1 },
        min: { x, y: y - 1 },
    }
}

const SHAPE_Z_3 = function (x, y) {
    return {
        map: [
            { x: x - 1, y },
            { x, y },
            { x, y: y + 1 },
            { x: x + 1, y: y + 1 },
        ],
        max: { x: x + 1, y: y + 1 },
        min: { x: x - 1, y },
    }
}

const SHAPE_Z_4 = function (x, y) {
    return {
        map: [
            { x, y: y - 1 },
            { x, y },
            { x: x - 1, y },
            { x: x - 1, y: y + 1 },
        ],
        max: { x, y: y + 1 },
        min: { x: x - 1, y: y - 1 },
    }
}

const SHAPE_T_1 = function (x, y) {
    return {
        map: [
            { x, y: y - 1 },
            { x: x - 1, y },
            { x, y },
            { x: x + 1, y },
        ],
        max: { x: x + 1, y },
        min: { x: x - 1, y: y - 1 },
    }
}

const SHAPE_T_2 = function (x, y) {
    return {
        map: [
            { x, y: y - 1 },
            { x, y },
            { x: x + 1, y },
            { x, y: y + 1 },
        ],
        max: { x: x + 1, y: y + 1 },
        min: { x, y: y - 1 },
    }
}

const SHAPE_T_3 = function (x, y) {
    return {
        map: [
            { x: x - 1, y },
            { x, y },
            { x: x + 1, y },
            { x, y: y + 1 },
        ],
        max: { x: x + 1, y: y + 1 },
        min: { x: x - 1, y },
    }
}

const SHAPE_T_4 = function (x, y) {
    return {
        map: [
            { x, y: y - 1 },
            { x, y },
            { x: x - 1, y },
            { x, y: y + 1 },
        ],
        max: { x, y: y + 1 },
        min: { x: x - 1, y: y - 1 },
    }
}

SHAPE_I_1.switch = SHAPE_I_2
SHAPE_I_2.switch = SHAPE_I_3
SHAPE_I_3.switch = SHAPE_I_4
SHAPE_I_4.switch = SHAPE_I_1
SHAPE_J_1.switch = SHAPE_J_2
SHAPE_J_2.switch = SHAPE_J_3
SHAPE_J_3.switch = SHAPE_J_4
SHAPE_J_4.switch = SHAPE_J_1
SHAPE_L_1.switch = SHAPE_L_2
SHAPE_L_2.switch = SHAPE_L_3
SHAPE_L_3.switch = SHAPE_L_4
SHAPE_L_4.switch = SHAPE_L_1
SHAPE_O.switch = SHAPE_O
SHAPE_S_1.switch = SHAPE_S_2
SHAPE_S_2.switch = SHAPE_S_3
SHAPE_S_3.switch = SHAPE_S_4
SHAPE_S_4.switch = SHAPE_S_1
SHAPE_Z_1.switch = SHAPE_Z_2
SHAPE_Z_2.switch = SHAPE_Z_3
SHAPE_Z_3.switch = SHAPE_Z_4
SHAPE_Z_4.switch = SHAPE_Z_1
SHAPE_T_1.switch = SHAPE_T_2
SHAPE_T_2.switch = SHAPE_T_3
SHAPE_T_3.switch = SHAPE_T_4
SHAPE_T_4.switch = SHAPE_T_1

module.exports = {
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
}
