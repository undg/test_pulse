export default class {
    constructor({player_data, img_url}) {
        this.api = {
                name     : player_data.name.first,
                surname  : player_data.name.last,
                position : player_data.info.positionInfo,
                id       : player_data.id,
                team_id  : player_data.currentTeam.id,
                img_url  : !!img_url && img_url,
        }
    }

    get name() {
        const name = `${this.api.name} ${this.api.surname}`
        return name
    }
    get position(){
        const array = this.api.position.split(' ')
        const position = array[array.length - 1]
        return position
    }

    get base_url() {
        const url = this.api.img_url[this.api.img_url.length - 1] === '/'
            ? this.api.img_url
            : this.api.img_url + '/'
        return url

    }
    get img_url() {
        const url = `${this.base_url}p${this.api.id}.png`
        return url
    }

    get sprite_position() {
        const sprite_size = 100

        // const grid = {x: 11, y: 10}
        // const position = () => ... ({top, left}) and [array(grid.x), array(grid.y)] 2d array to calculate position but...
        // emblems in sprite are not in order!!!
        // I need to hardcode it :'(

        // there is not many cases when nested ternary is awesome
        const position =  this.api.team_id === 21 ? {top: 10, left: 5}
                        : this.api.team_id === 11 ? {top:  7, left: 8}
                        : this.api.team_id === 12 ? {top:  8, left: 6}
                        : this.api.team_id ===  1 ? {top:  1, left: 1}
                        : this.api.team_id === 26 ? {top:  0, left: 0}
                        : {top: 1000, left: 1000}

        position.top *= - sprite_size
        position.left *= - sprite_size

        return position
    }
    get sprite() {
        const url = `${this.base_url}badges_sprite.png`
        const position = this.sprite_position
        return {
            url: url,
            position: position,
        }
    }

}
