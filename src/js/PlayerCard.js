import Api from './Api'

export default class {
    constructor({dom_id, dom_className, dom_dataAttr}) {
        this.dom = {
            root: null,
            // cards: [], I have a feeling that this array can be used for grid of cards
            card: document.createElement('div'),
            dropdown: document.createElement('div'),
            img: document.createElement('div'),
            logo: document.createElement('div'),
            title: document.createElement('div'),
            subtitle: document.createElement('div'),
            stats: document.createElement('div'),
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


        this.api_url = this.dom.root.dataset.url
        this.api = new Api({url: this.api_url, test: true})
        this.api.get_data({cb: this.update.bind(this)})

        this.dom = this.set_classNames(this.dom)
    }

    update(data) {
        this.dom.root.innerHTML = "" // 😥

        this.dom.card = this.card({dom:this.dom, data: data})
        this.dom.root.append(this.dom.card)
    }

    card({dom, data}) {
        this.data = data
        if(!data) {
            return null
        }
        const {
            card,
            dropdown,
            img,
            logo,
            title,
            subtitle,
            stats,
        } = dom

        const divs = [ dropdown, img, logo, title, subtitle, stats, ]
        divs.forEach( div => card.append(div) )
        
        return card
    }


    dropdown() {
    }

    stats({stats_dom, stats_data}) {

        const display = ['appearances', 'goals', 'goal_assist']

        stats_data.forEach(stat => {
            if(display.indexOf(stat.name) === -1) {
                return
            }
            const row = document.createElement('div')
            stats_dom.append(row)
        })

        return stats_dom
    }

    set_classNames(dom) {
        Object.keys(dom).forEach(key=>dom[key].classList.add(key))
        return dom
    }

}



