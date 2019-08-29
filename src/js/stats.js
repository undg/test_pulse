
export default class {
    constructor({stats_data}) {
        this.stats = stats_data
    }
    get appearances() {
        const name = "appearances"
        const stat = this.stats.filter(stat => stat.name === name)[0]
        return {
            name: "Appearances",
            value: stat.value,
        }
    }
    get goals(){
        const name = "goals"
        const stat = this.stats.filter(stat => stat.name === name)[0]
        return {
            name: "Goals",
            value: stat.value,
        }
    }

    get assist(){
        const name = "goal_assist"
        const stat = this.stats.filter(stat => stat.name === name)[0]
        return {
            name: "Assist",
            value: stat.value,
        }
    }

    get goals_per_match(){
        const value = Math.round(this.goals.value / this.appearances.value * 100) / 100
        return {
            name: "Goals per match",
            value: value,
        }
    }
    get goals_per_minute(){
        const mins_played = this.stats.filter(stat => stat.name === "mins_played")[0]
        const backward_pass = this.stats.filter(stat => stat.name === "backward_pass")[0]
        const fwd_pass = this.stats.filter(stat => stat.name === "fwd_pass")[0]
        const pass = backward_pass.value + fwd_pass.value
        const value = Math.round(pass / mins_played.value * 100) / 100
        return {
            name: "Goals per minute",
            value: value,
        }
    }
}
