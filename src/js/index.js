import PlayerCard from "./PlayerCard"
export default function init(){
    document.addEventListener("DOMContentLoaded", () => {
        const playerCard = new PlayerCard({dom_dataAttr: "StatCard"})
    })
}
init()

// few other options
//
// const playerCard = new PlayerCard({dom_id: "StatCard"})
// const playerCard = new PlayerCard({dom_className: "StatCard"})
//
// import  '@undg/player-card'
