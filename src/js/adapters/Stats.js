export default class {
    constructor({stats_data}) {
        this.api = {
            appearances   : stats_data.find(stat => stat.name === "appearances").value,
            goals         : stats_data.find(stat => stat.name === "goals").value,
            goal_assist   : stats_data.find(stat => stat.name === "goal_assist").value,
            mins_played   : stats_data.find(stat => stat.name === "mins_played").value,
            backward_pass : stats_data.find(stat => stat.name === "backward_pass").value,
            fwd_pass      : stats_data.find(stat => stat.name === "fwd_pass").value,
        }
    }
    get appearances() {
        return {
            name: "Appearances",
            value: this.api.appearances,
        }
    }
    get goals(){
        return {
            name: "Goals",
            value: this.api.goals,
        }
    }

    get assist(){
        return {
            name: "Assist",
            value: this.api.goal_assist,
        }
    }

    get goals_per_match(){
        const value = Math.round(this.api.goals / this.api.appearances * 100) / 100
        return {
            name: "Goals per match",
            value: value,
        }
    }
    get passes_per_minute(){
        const pass = this.api.backward_pass + this.api.fwd_pass
        const value = Math.round(pass / this.api.mins_played * 100) / 100
        return {
            name: "Passes per minute",
            value: value,
        }
    }

    get display() {
        return [
            this.appearances,
            this.goals,
            this.assist,
            this.goals_per_match,
            this.passes_per_minute,
        ]
    }
}
