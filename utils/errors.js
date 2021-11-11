class HTTP_ERROR extends Error {
    constructor(message, code, header) {
        super(message)
        this.message = message
        this.status = code
        this.header = header || {}
    }
}


module.exports = { HTTP_ERROR }