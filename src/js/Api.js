import axios from 'axios'

export default  class {
    constructor({url}){
        this.url = url
    }

    get_data({cb}) {
        axios.get(this.url)
            .then(res => cb(res.data))
            .catch(err => console.error(err))
    }
}
