console.log('\n\n\n\n')
const expect = require('chai').expect

const api_url = 'api/player-stats.json'
require('jsdom-global')(`<!DOCTYPE html><div id="id" data-url="${api_url}"></div>`)

const axios = require('axios')
const moxios = require('moxios')

const player_stats_json = require('../api/player-stats.json')

import PlayerCard from './../src/js/PlayerCard'

describe('PlayerCard.js', () => {
    beforeEach(function () {
        moxios.install()
        moxios.stubRequest(api_url, {
            status: 200,
            response: {
                data: player_stats_json
            }
        })
    })

    afterEach(function () {
        moxios.uninstall()
    })


    describe('api', () => {
        it('should have api key', () => {
            const playerCard = new PlayerCard({dom_id: "id"})
            expect(playerCard).to.have.any.key('api')
        })

        it('should have api key', () => {
            const playerCard = new PlayerCard({dom_id: "id"})
            expect(playerCard.api.url).to.not.be.empty
        })
    })


    describe('Creating card on initialization', () => {
        it('should have dom key', () => {
            const playerCard = new PlayerCard({dom_id: "id"})
            expect(playerCard).to.have.any.key('dom')
        })

        it('should have api key', () => {
            const playerCard = new PlayerCard({dom_id: "id"})
            expect(playerCard).to.have.any.key('api')
        })

        it('should create div with class .card', () => {
            const playerCard = new PlayerCard({dom_id: "id"})
            expect(playerCard.dom.root.firstElementChild.classList.contains('card')).to.be.ok
        })

        it("should clean old div's and always have only one child", () => {
            const playerCard = new PlayerCard({dom_id: "id"})
            expect(playerCard.dom.root.childElementCount).to.eq(1)
            //////////////////////////////////////// //////////////////////////////////////
            // expect(playerCard.dom.root).to.eq('')
        })
    })

    // from now on TDD 
    describe('dom elements', () => { // 😥
        it('should have link from data-url attr', () => {
            const playerCard = new PlayerCard({dom_id: "id"})
            expect(playerCard.api_url).to.eq(api_url)

        })

        it('should have old_dom that is and object', () => {
            const playerCard = new PlayerCard({dom_id: "id"})
            expect(playerCard.old_dom).to.be.an('object')
        })

        const divs = [ 'root', 'card', 'dropdown', 'img', 'logo', 'title', 'subtitle', 'stats']

        divs.forEach(div => {
            it(`should have dom object with key [ ${div} ]`, () => {
                const playerCard = new PlayerCard({dom_id: "id"})
                expect(playerCard.dom).to.be.an('object')
                    .that.have.any.key(div)
            })
            it(`should be div [ ${div} ]`, () => {
                const playerCard = new PlayerCard({dom_id: "id"})
                expect(playerCard.dom[div].tagName).to.eq('DIV')
            })
            it(`should have a class [ ${div} ]`, () => {
                const playerCard = new PlayerCard({dom_id: "id"})
                expect(playerCard.dom[div].classList[0]).to.eq(div)
            })
        })
    })



    describe('pure functions', () => { // 🙃 
        const dom = {
            wrap: document.createElement('div'),
            footer: document.createElement('div'),
        }
        it('should return object with same keys', () => {
            const playerCard = new PlayerCard({dom_id: "id"})
            expect(playerCard.set_classNames(dom)).to.have.keys('wrap', 'footer')
        })
        it('should return object and add className to each element', () => {
            const playerCard = new PlayerCard({dom_id: "id"})
            expect(playerCard.set_classNames(dom).wrap.classList.value).to.eq('wrap')
            expect(playerCard.set_classNames(dom).footer.classList.value).to.eq('footer')
        })
    })
})


