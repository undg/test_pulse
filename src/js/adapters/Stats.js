export default class {
    constructor({stats_data}) {
        const null_pattern = (name)  =>
            !!stats_data.find(stat => stat.name === name)
                ? stats_data.find(stat => stat.name === name)
                : {value: 0}

        this.api = {
            appearances   : null_pattern("appearances").value,
            goals         : null_pattern("goals").value,
            goal_assist   : null_pattern("goal_assist").value,
            mins_played   : null_pattern("mins_played").value,
            backward_pass : null_pattern("backward_pass").value,
            fwd_pass      : null_pattern("fwd_pass").value,
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
        const value = this.api.goals !== 0 || this.api.appearances !== 0
            ? Math.round(this.api.goals / this.api.appearances * 100) / 100
            : 0
        return {
            name: "Goals per match",
            value: value,
        }
    }
    get passes_per_minute(){
        const pass = this.api.backward_pass + this.api.fwd_pass
        const value = pass !== 0 || this.api.mins_played !== 0
            ? Math.round(pass / this.api.mins_played * 100) / 100
            : 0
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
