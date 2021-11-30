const { removeUnexpectedProperties, validate } = require('../utils')
const expect = require('chai').expect

describe('Utils', () => {
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
    it('Should escape special characters', () => {
        expect(escape('<script>alert(\'&1"\')</script>')).to.equal('%3Cscript%3Ealert%28%27%261%22%27%29%3C/script%3E')
    })
})