const { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP, MOVE_DEEP_DOWN } = require("../configs")
const { CustomError } = require("../utils/errors")

module.exports = class GameSubscription {
    static getInfo(event) {
        if (this.player && this.player.room && this.player.room.game) {
            return this.player.room.game.engines[this.player.name].generateInfo(event)
        }
        return null
    }
    static start(listener) {
        if (this.player && this.player.room) {
            const room = this.player.room
            return room.startGame(this.player, listener)
        } else
            throw new CustomError('you need to join room first')
    }
    static pause() {
        if (this.player && this.player.room) {
            const room = this.player.room
            if (room.game && room.game.isStarted) {
                return room.pauseGame(this.player)
            } else
                throw new CustomError('game not started yet')
        } else
            throw new CustomError('you need to join room first')
    }
    static restart() {
        if (this.player && this.player.room) {
            const room = this.player.room
            // if (room && room.options && room.options.mode === 'multi' && Object.keys(room.player).length < 2)
            //     throw new CustomError('game need more than or equal two player to restart')
            if (room.game) {
                return room.restartGame(this.player)
            } else
                throw new CustomError('game not started yet')
        } else
            throw new CustomError('you need to join room first')
    }
    static move(key) {
        // key authorized
        if ([MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP, MOVE_DEEP_DOWN].indexOf(key) !== -1) {
            if (this.player && this.player.room && this.player.room.game && this.player.room.game.isStarted) {
                const game = this.player.room.game
                if (game.engines && game.engines[this.player.name]) {
                    const engine = game.engines[this.player.name]
                    engine.movePiece(key)
                }
            }
        }
        else throw new CustomError('Incorrect Key')
    }
}