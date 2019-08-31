console.log('\n\n\n\n')
const expect = require('chai').expect
const json = require('../api/player-stats.json')
import Stats from './../src/js/adapters/Stats'
const stats = new Stats({stats_data: json.players[0].stats})

describe('stats.js', () => {
    it('should be ok', () => {
        expect(stats).to.be.ok
    })

    it('should return appearances(80)', () => {
        expect(stats.appearances).to.eql({name: "Appearances", value: 80})
    })

    it('should return goals(5)', () => {
        expect(stats.goals).to.eql({name: "Goals", value: 5})
    })

    it('should return assist(2)', () => {
        expect(stats.assist).to.eql({name: "Assist", value: 2})
    })

    it('should return Goals per match(0.06)', () => {
        expect(stats.goals_per_match).to.eql({name: "Goals per match", value: 0.06})
    })

    it('should return Passes per minute(0.26)', () => {
        expect(stats.passes_per_minute).to.eql({name: "Passes per minute", value: 0.26})
    })

    it('should return array', () => {
        expect(stats.display).to.be.an('array')
    })

    it('should return array', () => {
        expect(stats.display).to.be.lengthOf(5)
    })

    describe('Null object pattern', () => {
        const stats = new Stats({stats_data: json.players[3].stats})
        it('should return 0 (assist)', () => {
            expect(stats.display[2].value).to.eq(0)
        })
    })
})


