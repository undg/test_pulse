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

        this.dom_root
        this.data

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

    card() {
        if(!this.data) {
            return null
        }
        const {card} = this.dom
        
        card.classList.add('card')

        // tmp
        const pre = document.createElement('pre')
        pre.innerText = this.data && JSON.stringify(this.data, null, 4)
        card.append(pre)

        return card
    }

    update(data) {
        this.data = data

        this.dom.root.innerHTML = "" // 😥

        this.dom.card = this.card()
        this.dom.root.append(this.dom.card)
    }

    dropdown() {
    }

    set_classNames(dom) {
        Object.keys(dom).forEach(key=>dom[key].classList.add(key))
        return dom
    }

}



