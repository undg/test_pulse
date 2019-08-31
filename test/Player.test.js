console.log('\n\n\n\n')
const expect = require('chai').expect
const json = require('../api/player-stats.json')
import Player from './../src/js/adapters/Player'
const player = new Player({player_data: json.players[0].player})

describe('stats.js', () => {
    it('should be ok', () => {
        expect(player).to.be.ok
    })

    it('should have put usefull info from api into constructr', () => {
        expect(player.api).to.have.all.keys('name', 'surname', 'position')
    })

    it('should return string', () => {
        expect(player.name).to.be.an('string')
    })

    it('should return name and surname', () => {
        expect(player.name).to.be.eq('Toby Alderweireld')
    })

    it('should return position (last word from string)', () => {
        expect(player.position).to.be.eq('Defender')
    })

})


