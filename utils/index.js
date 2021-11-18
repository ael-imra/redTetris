const fs = require('fs')
const path = require('path')

const fsExists = f => new Promise(r => fs.exists(f, r))
const fsExistsSync = f => fs.existsSync(f)
const fsStat = f => new Promise(r => fs.stat(f, (e, s) => r([e, s])))
const fsCreateReadStream = fs.createReadStream

const pJoin = function () {
    return path.join(...Object.values(arguments))
}
const pNormalize = (p) => path.normalize(p)
const pExt = f => path.extname(f)
const pResolve = path.resolve


module.exports = { fsExists, fsExistsSync, fsStat, pJoin, pNormalize, pExt, fsCreateReadStream, pResolve }