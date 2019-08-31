console.log('\n\n\n\n')
const expect = require('chai').expect
const json = require('../api/player-stats.json')
import Player from './../src/js/adapters/Player'
const player = new Player({player_data: json.players[0].player, img_url: 'img_path/'})

describe('stats.js', () => {
    it('should be ok', () => {
        expect(player).to.be.ok
    })

    it('should have put usefull info from api into constructr', () => {
        expect(player.api).to.have.all.keys('name', 'surname', 'position', 'id', 'img_url', 'team_id')
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

    it('should return url to player image', () => {
        expect(player.img_url).to.be.eq('img_path/p4916.png')
    })

    it('should add slash if missing', () => {
        const player = new Player({player_data: json.players[0].player, img_url: 'noslash'})
        expect(player.img_url).to.be.eq('noslash/p4916.png')
    })

    it('should return obj with sprite url', () => {
        expect(player.sprite).to.be.an('object')
    })

    it('should return path to sprite', () => {
        expect(player.sprite.url).to.eq('img_path/badges_sprite.png')
    })

    describe('Positioning emblems in sprite', () => {
        it('should return correct position on sprite', () => {
            const player = new Player({player_data: json.players[0].player, img_url: 'noslash'})
            expect(player.sprite.position).to.eql({top: -1000, left: -500})
        })
        it('should return correct position on sprite', () => {
            const player = new Player({player_data: json.players[1].player, img_url: 'noslash'})
            expect(player.sprite.position).to.eql({top: -700, left: -800})
        })
        it('should return correct position on sprite', () => {
            const player = new Player({player_data: json.players[2].player, img_url: 'noslash'})
            expect(player.sprite.position).to.eql({top: -800, left: -600})
        })
        it('should return correct position on sprite', () => {
            const player = new Player({player_data: json.players[3].player, img_url: 'noslash'})
            expect(player.sprite.position).to.eql({top: -100, left: -100})
        })
        it('should return correct position on sprite', () => {
            const player = new Player({player_data: json.players[4].player, img_url: 'noslash'})
            expect(player.sprite.position).to.eql({top: -0, left: -0})
        })
        it('should return correct position on sprite', () => {
            const player = new Player({player_data: json.players[1].player, img_url: 'noslash'})
            player.api.team_id = null
            expect(player.sprite.position).to.eql({top: -100000, left: -100000})
        })
    })
})


