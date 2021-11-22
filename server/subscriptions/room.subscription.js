const CustomError = require("../errors")
const Room = require("../room.class")

module.exports = class RoomSubscription {
    static get(name, page, limit) {
        limit = parseInt(limit) > 0 ? parseInt(limit) > 50 ? 50 : parseInt(limit) : 0
        page = parseInt(page) > 0 ? parseInt(page) : 0
        // name = name ? name : ''
        const rooms = limit > 0 ? [...Object.values(Room.rooms)].slice(page * limit, (page + 1) * limit) : Object.values(Room.rooms)
        const data = []
        for (const room of rooms)
            if ((!name || room.name.indexOf(name) !== -1) && (!room.game || !room.game.isStarted))
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
        if (typeof name !== 'string' || typeof options !== 'object') throw new CustomError('incorrect parameters')
        if (this.player && this.player.create(name, options)) {
            const room = this.player.room
            return room.info
        }
        return null
    }
    static join(name) {
        if (typeof name !== 'string') throw new CustomError('incorrect name')
        if (this.player && this.player.join(name)) {
            const room = this.player.room
            return room.info
        }
        return null
    }
    static kick(username) {
        if (typeof username === 'string' && this.player && this.player.room)
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