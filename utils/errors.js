class HTTP_ERROR extends Error {
    constructor(message, code, header) {
        super(message)
        this.message = message
        this.status = code
        this.header = header || {}
    }
}
const FOLDER_NOT_FOUND = "Folder not found"
const METHOD_NOT_ALLOWED = 'this method is not allowed'
const FORBIDDEN = 'you do not have permission'

module.exports = { HTTP_ERROR, FOLDER_NOT_FOUND, METHOD_NOT_ALLOWED, FORBIDDEN }