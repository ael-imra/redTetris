const fs = require('fs')
const path = require('path')

const fsExists = (f) =>
    new Promise((r) => fs.exists(f, r))
const fsExistsSync = (f) => fs.existsSync(f)
const fsStat = (f) =>
    new Promise((r) =>
        fs.stat(f, (e, s) => r([e, s]))
    )
const fsCreateReadStream = fs.createReadStream

const pJoin = function () {
    return path.join(...Object.values(arguments))
}
const pNormalize = (p) => path.normalize(p)
const pExt = (f) => path.extname(f)
const pResolve = path.resolve

const validate = function (type, value) {
    if (type === 'name' && typeof value === 'string')
        return /[a-zA-Z0-9]{3,25}/.test(value)
    else if (type === 'message' && typeof value === 'string')
        return /.{3,255}/.test(value)
    return false
}
const removeUnexpectedProperties = function (
    obj,
    properties,
    defaultValues
) {
    if (typeof obj !== 'object')
        throw new Error(
            'Unexpected type of parameters'
        )
    if (typeof properties !== 'object')
        throw new Error(
            'Unexpected type of properties'
        )
    if (typeof defaultValues !== 'object')
        throw new Error(
            'Unexpected type of defaultValues'
        )
    const newObject = {}
    for (prop of properties)
        newObject[prop] =
            obj[prop] || defaultValues[prop]
    return newObject
}
const escape = function (str) {
    const htmlEntities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;"
    };
    return str.replace(/([&<>\"'])/g, match => htmlEntities[match]);
}
module.exports = {
    fsExists,
    fsExistsSync,
    fsStat,
    pJoin,
    pNormalize,
    pExt,
    fsCreateReadStream,
    pResolve,
    validate,
    removeUnexpectedProperties,
    escape
}
