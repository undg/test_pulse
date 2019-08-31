import Api from './Api'
import Stats from './adapters/Stats'
import Player from './adapters/Player'

export default class {
    constructor({dom_id, dom_className, dom_dataAttr}) {
        this.dom = {
            root: null,
            card: document.createElement('div'),
            dropdown: document.createElement('div'),
            img: document.createElement('div'),
            logo: document.createElement('div'),
            title: document.createElement('div'),
            subtitle: document.createElement('div'),
            stats: document.createElement('div'),
        }

        this.player = {
            idx: 0, // tmp hardcoded
            stats: data => data.players[this.player.idx].stats,
            player: data => data.players[this.player.idx].player,
            position: data => "tmp",
        }

        this.lang = {
            select_player: {en: "Select a player..."}
        }


        this.old_dom = {} // helper obj, history buffer
        this.data //

        if(!!dom_id) {
            this.dom.root = document.getElementById(dom_id)
        } else if (!!dom_dataAttr) {
            this.dom.root = document.querySelector('[data-' + dom_dataAttr + ']')
        } else if (!!dom_className) {
            this.dom.root = document.querySelector('.' + dom_className)
        }


        this.api_url = this.dom.root.dataset.api_url
        this.img_url = this.dom.root.dataset.img_url

        this.api = new Api({url: this.api_url, test: true})
        this.api.get_data({cb: this.update.bind(this)})

        this.dom = this.set_classNames(this.dom)
    }



    update(data) {
        while (this.dom.root.hasChildNodes()) {
            this.dom.root.removeChid(this.dom.root.lastChild)
        }
        if(!data.players) { // w8 for api
            return
        }

        this.dom.stats = this.stats({
            stats_dom: this.dom.stats,
            stats_data: this.player.stats(data),
        })

        const header = this.header({
            img_dom: this.dom.img,
            logo_dom: this.dom.logo,
            title_dom: this.dom.title,
            subtitle_dom: this.dom.subtitle,
            img_url: this.img_url,
            player_data: this.player.player(data),
        })

        const dropdown = this.dropdown({
            dropdown_dom: this.dom.dropdown,
            playersNames_data: data.players.map(
                el => el.player.name.first + ' ' + el.player.name.last
            ),
            lang: this.lang,
        })

        this.dom.dropdown = dropdown

        this.dom.img = header.img
        this.dom.logo = header.logo
        this.dom.title = header.title
        this.dom.subtitle = header.subtitle

        this.dom.card = this.card({dom: this.dom, data: data})
        this.dom.root.append(this.dom.card)
    }



    set_classNames(dom) {
        Object.keys(dom).forEach(key=>dom[key].classList.add(key))
        return dom
    }



    card({dom, data, stats_cb}) {
        this.data = data
        if(!data) { return null }

        const {
            card,
            dropdown,
            img,
            logo,
            title,
            subtitle,
            stats,
        } = dom

        const divs = [
            dropdown,
            img,
            logo,
            title,
            subtitle,
            stats,
        ]
        divs.forEach( div => card.append(div) )

        return card
    }



    dropdown({dropdown_dom, playersNames_data, lang}) {
        const span = document.createElement('span')
        span.innerText = lang.select_player.en

        const ul = document.createElement('ul')
        const names = playersNames_data.map(name => {
            const li = document.createElement('li')
            li.innerText = name
            ul.append(li)
        })

        dropdown_dom.append(span)
        dropdown_dom.append(ul)
        return dropdown_dom
    }



    header({title_dom, subtitle_dom, img_dom, logo_dom, img_url, logo, player_data}) {
        const player = new Player({player_data: player_data, img_url: img_url})
  
        const sprite = document.createElement('div')
        const top = player.sprite.position.top + 'px' 
        const left = player.sprite.position.left + 'px' 
        const style = `background: url('${player.sprite.url}') left ${left} top ${top};`
        sprite.setAttribute('style', style)
        sprite.classList.add('emblem')
        logo_dom.append(sprite)

        const player_photo = document.createElement('img')
        player_photo.src = player.img_url
        player_photo.classList.add('player_photo')
        img_dom.append(player_photo)

        const name = document.createElement('h2')
        name.innerText = player.name
        name.classList.add('player_name')
        title_dom.append(name)

        const position = document.createElement('h3')
        position.innerText = player.position
        position.classList.add('player_team')
        subtitle_dom.append(position)

        return {
            img: img_dom,
            logo: logo_dom,
            title: title_dom,
            subtitle: subtitle_dom,
        }
    }



    stats({stats_dom, stats_data}) {
        const display = new Stats({stats_data: stats_data}).display

        display.forEach(stat => {
            const row = document.createElement('div')
            row.classList.add("stats_row")

            const name = document.createElement('p')
            name.innerText = stat.name
            name.classList.add("stats_name")

            const value = document.createElement('p')
            value.innerText = `${stat.value}`
            value.classList.add("stats_value")

            row.append(name, value)
            stats_dom.append(row)
        })

        return stats_dom
    }

}



