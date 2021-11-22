function removeUnexpectedProperties(obj, properties, defaultValues) {
    if (typeof properties !== 'object')
        throw new Error('Unexpected type of properties')
    if (typeof obj !== 'object')
        throw new Error('Unexpected type of parameters')
    const newObject = {}
    for (prop of properties)
        newObject[prop] = obj[prop] || defaultValues[prop]
    return newObject
}
function validate(type, value) {
    if (type === 'name' && typeof value === 'string')
        return true
    return false
}

module.exports = { removeUnexpectedProperties, validate }