import Api from './Api'
import Stats from './adapters/Stats'
import Player from './adapters/Player'

export default class {
    constructor({dom_id, dom_className, dom_dataAttr, tdd}) {
        this.tdd = tdd

        this.dom = {
            root     : null,
            card     : document.createElement('div'),
            dropdown : document.createElement('div'),
            img      : document.createElement('div'),
            logo     : document.createElement('div'),
            title    : document.createElement('div'),
            subtitle : document.createElement('div'),
            stats    : document.createElement('div'),
        }

        this.player = {
            idx    : 0,
            stats  : data => data.players[this.player.idx].stats,
            player : data => data.players[this.player.idx].player,
        }

        this.lang = {
            select_player: {en: "Select a player..."}
        }


        if(!!dom_id) {
            this.dom.root = document.getElementById(dom_id)
        } else if (!!dom_dataAttr) {
            this.dom.root = document.querySelector('[data-' + dom_dataAttr + ']')
        } else if (!!dom_className) {
            this.dom.root = document.querySelector('.' + dom_className)
        }


        this.api_url = this.dom.root.dataset.api_url
        this.img_url = this.dom.root.dataset.img_url

        this.api = new Api({url: this.api_url})
        this.api.get_data({cb: this.update.bind(this)})

        this.dom = this.set_classNames(this.dom)

        this.data // static data from api
    }



    update(data) {
        // jsdom doesn't have a click events... testing DOM is hard :p
        // I prefer to sacrifice 7 lines of code than 30+ tests.
        if(this.tdd) {
            while (this.dom.root.hasChildNodes()) {
                this.dom.root.removeChid(this.dom.root.lastChild)
            }
        } else {
            this.dom.dropdown.innerHTML = ""
            this.dom.img.innerHTML      = ""
            this.dom.logo.innerHTML     = ""
            this.dom.title.innerHTML    = ""
            this.dom.subtitle.innerHTML = ""
            this.dom.card.innerHTML     = ""
            this.dom.stats.innerHTML    = ""
        }

        if(!data.players) { // w8 for api
            return
        }

        const card = this.card({dom: this.dom, data: data})

        const dropdown = this.dropdown({
            dropdown_dom: this.dom.dropdown,
            playersNames_data: data.players.map(
                el => el.player.name.first + ' ' + el.player.name.last
            ),
            lang: this.lang,
        })

        const header = this.header({
            dom          : this.dom,
            img_url      : this.img_url,
            player_data  : this.player.player(data),
        })

        const stats = this.stats({
            stats_dom  : this.dom.stats,
            stats_data : this.player.stats(data),
        })


        this.dom.card     = card
        this.dom.dropdown = dropdown
        this.dom.img      = header.img
        this.dom.logo     = header.logo
        this.dom.title    = header.title
        this.dom.subtitle = header.subtitle
        this.dom.stats    = stats

        this.dom.root.insertBefore(this.dom.card, this.dom.root.lastChild)
    }



    set_classNames(dom) {
        Object.keys(dom).forEach(key=>dom[key].classList.add(key))
        return dom
    }



    card({dom, data, stats_cb}) {
        this.data = data
        if(!data) { return null }

        dom.card.insertBefore(dom.stats, dom.card.lastChild)
        dom.card.insertBefore(dom.subtitle, dom.stats)
        dom.card.insertBefore(dom.title, dom.subtitle)
        dom.card.insertBefore(dom.logo, dom.title)
        dom.card.insertBefore(dom.img, dom.logo)
        dom.card.insertBefore(dom.dropdown, dom.img)

        return dom.card
    }



    dropdown({dropdown_dom, playersNames_data, lang}) {
        const span = document.createElement('span')
        span.innerText = lang.select_player.en
        span.addEventListener('click', () => {
            dropdown_dom.classList.toggle('open')
        })

        const ul = document.createElement('ul')


        // playersNames_data.forEach((name, idx) => {
        let last_li = ul.lastChild
        for(let i = playersNames_data.length - 1; i >= 0; i--){
            const li = document.createElement('li')
            li.addEventListener('click', () => {
                this.player.idx = i
                dropdown_dom.classList.toggle('open')
                // update with static data, but we can call another API
                this.update(this.data)
            })
            li.innerText = playersNames_data[i]

            ul.insertBefore(li, last_li)
            last_li = li
        }



        dropdown_dom.insertBefore(ul, dropdown_dom.lastChild)
        dropdown_dom.insertBefore(span, ul)
        return dropdown_dom
    }



    header({ dom, img_url, player_data}) {
        const player = new Player({player_data: player_data, img_url: img_url})
  
        const top = player.sprite.position.top + 'px' 
        const left = player.sprite.position.left + 'px' 

        const sprite = document.createElement('div')
        sprite.classList.add('emblem')

        /**/ // inline style can be nightmare for maintainers
        const style = `background: url('${player.sprite.url}') left ${left} top ${top};`
        sprite.setAttribute('style', style)
        /**/ 

        /** / // better option, but harder to test
        const emblem_class = 'bd3a4cd9' // anything random
        sprite.classList.add(emblem_class)
        const style = document.createElement('style')
        style.innerText = `
        .${emblem_class} {
            background: url('${player.sprite.url}') left ${left} top ${top};
        }`
        dom.logo.insertBefore(style, dom.logo.lastChild)
        /**/ 

        dom.logo.insertBefore(sprite, dom.logo.lastChild)

        const player_photo = document.createElement('img')
        player_photo.src = player.img_url
        player_photo.classList.add('player_photo')
        dom.img.insertBefore(player_photo, dom.img.lastChild)

        const name = document.createElement('h2')
        name.innerText = player.name
        name.classList.add('player_name')
        dom.title.insertBefore(name, dom.title.lastChild)

        const position = document.createElement('h3')
        position.innerText = player.position
        position.classList.add('player_team')
        dom.subtitle.insertBefore(position, dom.subtitle.lastChild)

        return {
            img: dom.img,
            logo: dom.logo,
            title: dom.title,
            subtitle: dom.subtitle,
        }
    }



    stats({stats_dom, stats_data}) {
        const display = new Stats({stats_data: stats_data}).display

        let last_row = stats_dom.lastChild
        for(let i = display.length - 1; i >= 0; i--){
            const row = document.createElement('div')
            row.classList.add("stats_row")

            const name = document.createElement('p')
            name.innerText = display[i].name
            name.classList.add("stats_name")

            const value = document.createElement('p')
            value.innerText = `${display[i].value}`
            value.classList.add("stats_value")

            row.insertBefore(value, row.lastChild)
            row.insertBefore(name, value)

            stats_dom.insertBefore(row, last_row)
            last_row = row
        }

        return stats_dom
    }

}



