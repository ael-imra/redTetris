const Engine = require("../classes/engine.class")
const Game = require("../classes/game.class")
const Room = require("../classes/room.class")
const Player = require("../classes/player.class")
const { expect } = require("chai")

describe('Piece Class', () => {
    const data = {}
    it('Should create pieces without duplicate', () => {
        data.player = new Player('pieceTest')
        data.room = new Room(data.player, 'pieceTest')
        data.game = new Game(data.room)
        data.engine = new Engine(data.game, data.player)
        const pieces = [data.engine.piece.shape, data.engine.nextPiece.shape]
        pieces.push(data.game.pieces[2].clone(data.engine).shape)
        //just to test line if (this.engine.lastColors.length === 3) this.engine.lastColors.shift()
        pieces.push(data.game.pieces[3].clone(data.engine).shape)
        pieces.pop()
        expect(pieces.toString().replace(pieces[0]).indexOf(pieces[0])).to.equal(-1)
        expect(pieces.toString().replace(pieces[1]).indexOf(pieces[1])).to.equal(-1)
        expect(pieces.toString().replace(pieces[2]).indexOf(pieces[2])).to.equal(-1)
    })
})
