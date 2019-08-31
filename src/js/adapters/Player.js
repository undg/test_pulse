export default class {
    constructor({player_data}) {
        this.api = {
            name     : player_data.name.first,
            surname  : player_data.name.last,
            position : player_data.info.positionInfo,
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

}
