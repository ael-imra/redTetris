const { expect } = require("chai")
const Engine = require("../classes/engine.class")

describe('Engine Class', () => {
    it('Should throw incorrect game', () => {
        expect(() => new Engine()).to.throw('incorrect game')
    })
})