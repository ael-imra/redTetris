const CustomError = require("../utils/errors")
const Room = require("../classes/room.class")
const { validate } = require("../utils")

module.exports = class RoomSubscription {
    static get(name, page, limit) {
        limit = parseInt(limit) > 0 ? parseInt(limit) > 50 ? 50 : parseInt(limit) : 0
        page = parseInt(page) > 0 ? parseInt(page) : 0
        const rooms = limit > 0 ? [...Object.values(Room.rooms)].slice(page * limit, (page + 1) * limit) : Object.values(Room.rooms)
        const data = []
        for (const room of rooms)
            if ((!name || room.name.indexOf(name) !== -1) && (!room.game || !room.game.isStarted) && room.options.privacy !== 'private')
                data.push({ maxPlayer: room.options.maxPlayers, countPlayer: Object.keys(room.players).length, name: room.name })
        const info = {
            data,
            next: (page + 1) * limit < Object.values(Room.rooms).length,
            page,
            limit
        }
        return info
    }
    static create(name, options) {
        if (!validate('name', name)) throw new CustomError('incorrect name')
        if (this.player && this.player.create(name, options)) {
            const room = this.player.room
            return room.info
        }
        return null
    }
    static join(name) {
        if (!validate('name', name)) throw new CustomError('incorrect name')
        if (this.player && this.player.join(name)) {
            const room = this.player.room
            return room.info
        }
        return null
    }
    static kick(username) {
        if (validate('name', username) && this.player && this.player.room)
            return this.player.room.kick(this.player, username)
        return false
    }
    static message(message) {
        if (typeof message === 'string' && message.trim() && this.player && this.player.room) {
            const msg = { name: this.player.name, message }
            this.player.room.messages.push(msg)
            return msg
        }
        return null
    }
    static exit() {
        if (this.player && this.player.room)
            return this.player.room.exit(this.player)
        return false
    }
}