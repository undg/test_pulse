import PlayerCard from "./PlayerCard"

// few other options
// const playerCard = new PlayerCard({dom_id: "StatCard"})
// const playerCard = new PlayerCard({dom_className: "StatCard"})

document.addEventListener("DOMContentLoaded", () => {
    const playerCard = new PlayerCard({dom_dataAttr: "StatCard", document: document})
})
