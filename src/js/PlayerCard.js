import Api from './Api'

export default class {
    constructor({dom_id, dom_className, dom_dataAttr}) {
        this.dom_root
        this.data
        this.old_card

        if(!!dom_id) {
            this.dom_root = document.getElementById(dom_id)
        } else if (!!dom_dataAttr) {
            this.dom_root = document.querySelector('[data-' + dom_dataAttr + ']')
        } else if (!!dom_className) {
            this.dom_root = document.querySelector('.' + dom_className)
        } 


        this.api = new Api({url: 'api/player-stats.json', test: true})
        this.api.get_data({cb: this.update.bind(this), test: true})
    }

    card() {
        if(!this.data) {
            return null
        }
        
        const div = document.createElement('div')
        div.classList.add('card')

        // tmp
        const pre = document.createElement('pre')
        pre.innerText = this.data && JSON.stringify(this.data, null, 4)
        div.append(pre)

        return div
    }

    update(data) {
        this.data = data

        if(!!this.old_card) {
            this.dom_root.removeChild(this.old_card)
        }
        this.dom_root.append(this.card())
        this.old_card = this.card()
    }

}
