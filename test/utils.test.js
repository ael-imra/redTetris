const { removeUnexpectedProperties } = require('../utils')
const expect = require('chai').expect

describe('Player Class', () => {
    it('Should throw Unexpected type of properties', () => {
        expect(() => removeUnexpectedProperties()).to.throw(
            'Unexpected type of parameters'
        )
    })
    it('Should throw Unexpected type of properties', () => {
        expect(() => removeUnexpectedProperties({})).to.throw(
            'Unexpected type of properties'
        )
    })
    it('Should throw Unexpected type of defaultValues', () => {
        expect(() => removeUnexpectedProperties({}, {})).to.throw(
            'Unexpected type of defaultValues'
        )
    })
})