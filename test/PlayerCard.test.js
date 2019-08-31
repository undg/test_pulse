console.log('\n\n\n\n')
const expect = require('chai').expect

const api_url = 'api/player-stats.json'
const img_url = 'img_path/'
require('jsdom-global')(`
<!DOCTYPE html>
        <div id="id"
        data-api_url="${api_url}"
        data-img_url="${img_url}"
    ></div>
</html>
`)

const axios = require('axios')
const moxios = require('moxios')

const json = require('../api/player-stats.json')

import PlayerCard from './../src/js/PlayerCard'

describe('PlayerCard.js', () => {
    moxios.install()
    moxios.stubRequest(api_url, {
        status: 200,
        response: {
            data: json,
        },
    })

    after(function () {
        moxios.uninstall()
    })


    const playerCard = new PlayerCard({dom_id: "id"})

    describe('constructor', () => {
        it('should have api key', () => {
            expect(playerCard).to.have.any.key('api')
        })

        it('should have api key', () => {
            expect(playerCard.api.url).to.not.be.empty
        })
    })


    describe('Creating card on initialization', () => {
        it('should have dom key', () => {
            expect(playerCard).to.have.any.key('dom')
        })
    })

    // from now on TDD  // 🙃 
    describe('dom elements', () => {
        it('should have link from data-url attr', () => {
            expect(playerCard.api_url).to.eq(api_url)
        })

        it('should have old_dom that is and object', () => {
            expect(playerCard.old_dom).to.be.an('object')
        })

        const divs = [ 'root', 'card', 'dropdown', 'img', 'logo', 'title', 'subtitle', 'stats']

        divs.forEach(div => {
            it(`should have dom object with key [ ${div} ]`, () => {
                expect(playerCard.dom).to.be.an('object')
                    .that.have.any.key(div)
            })
            it(`should be div [ ${div} ]`, () => {
                expect(playerCard.dom[div].tagName).to.eq('DIV')
            })
            it(`should have a class [ ${div} ]`, () => {
                expect(playerCard.dom[div].classList[0]).to.eq(div)
            })
        })
    })



    describe('pure functions', () => {
        const dom = {
            wrap: document.createElement('div'),
            footer: document.createElement('div'),
        }

        describe('set_classNames()', () => {
            it('should return object with same keys', () => {
                expect(playerCard.set_classNames(dom)).to.have.keys('wrap', 'footer')
            })

            it('should return object and add className to each element', () => {
                expect(playerCard.set_classNames(dom).wrap.classList.value).to.eq('wrap')
                expect(playerCard.set_classNames(dom).footer.classList.value).to.eq('footer')
            })
        })



        describe('card()', () => {
            const card = playerCard.card({
                dom: playerCard.dom,
                data: json
            })

            it('should be and function', () => {
                expect(playerCard.card).to.be.an('Function')
            })

            it('should append div.dropdown', () => {
                expect(card.childNodes[0].classList[0]).to.eq('dropdown')
            })

            it('should append div.img', () => {
                expect(card.childNodes[1].classList[0]).to.eq('img')
            })

            it('should append div.logo', () => {
                expect(card.childNodes[2].classList[0]).to.eq('logo')
            })

            it('should append div.title', () => {
                expect(card.childNodes[3].classList[0]).to.eq('title')
            })

            it('should append div.subtitle', () => {
                expect(card.childNodes[4].classList[0]).to.eq('subtitle')
            })

            it('should append div.stats', () => {
                expect(card.childNodes[5].classList[0]).to.eq('stats')
            })
        })



        describe('stats()', () => {
            const stats = playerCard.stats({
                stats_dom: playerCard.dom.stats,
                stats_data: json.players[0].stats
            })
            it('should be OK', () => {
                expect(stats.childElementCount).to.eq(5)
            })

            it('should have grandchild <p>', () => {
                expect(stats.firstElementChild.childNodes[0].tagName).to.eq('P')
            })

            it('should have text "Appearances"', () => {
                expect(stats.firstElementChild.childNodes[0].innerText).to.eq('Appearances')
            })
            it('should have another grandchild <p>', () => {
                expect(stats.firstElementChild.childNodes[1].tagName).to.eq('P')
            })
            it('should have score as a string(80)', () => {
                expect(stats.firstElementChild.childNodes[1].innerText).to.be.an('string').that.is.eq('80')
            })
        })



        describe('header()', () => {
            const header = playerCard.header({
                img_dom: playerCard.dom.img,
                logo_dom: playerCard.dom.logo,
                title_dom: playerCard.dom.title,
                subtitle_dom: playerCard.dom.subtitle,
                img_url: playerCard.img_url,
                player_data: json.players[0].player,
            })
            it('should be OK', () => {
                expect(header).to.be.ok
            })

            describe('player inforamtions', () => {
                it('should have a <h2>', () => {
                    expect(header.title.firstElementChild.tagName).to.eq('H2')
                })

                it('should have a class ".player_name"', () => {
                    expect(header.title.firstElementChild.classList.contains('player_name')).to.be.true
                })

                it('should have a <h2>', () => {
                    expect(header.title.firstElementChild.innerText).to.eq('Toby Alderweireld')
                })

                it('should have a <h3>', () => {
                    expect(header.subtitle.firstElementChild.tagName).to.eq('H3')
                })

                it('should have a class ".player_team"', () => {
                    expect(header.subtitle.firstElementChild.classList.contains('player_team')).to.be.true
                })
            })

            describe('player photo', () => {
                it('should have a <img>', () => {
                    expect(header.img.firstElementChild.tagName).to.eq('IMG')
                })

                it('should have a <img>', () => {
                    expect(header.img.firstElementChild.classList[0]).to.eq('player_photo')
                })

                it('should have a src to correct image', () => {
                    expect(header.img.firstElementChild.src).to.eq('img_path/p4916.png')
                })
            })

            describe('logo', () => {
                it('should have a <div>', () => {
                    expect(header.logo.firstElementChild.tagName).to.eq('DIV')
                })

                it('should have a class .emblem', () => {
                    expect(header.logo.firstElementChild.classList[0]).to.eq('emblem')
                })

                it('should have a src to correct image', () => {
                    expect(header.logo.firstElementChild.style.backgroundImage).to.eq('url(img_path/badges_sprite.png)')
                })

                it('should have a src to correct image', () => {
                    expect(header.logo.firstElementChild.style.backgroundPosition).to.eq('-1000px')
                })
            })

        })

    })
})


