// require in index.html, exercise.html, and stats.html

// creates an API object
const API = {

    // method for getting last workout information
    async getLastWorkout() {
        let res;
        try {
            res = await fetch("/api/workouts");
        } catch (err) {
            console.log(err)
        }
        const json = await res.json();

        return json[json.length - 1];
    },

    // method for updating a workout by adding an exercise
    async addExercise(data) {
        const id = location.search.split("=")[1];

        // saves response from /api/workouts/:id call to a variable
        const res = await fetch("/api/workouts/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        // waits for the response from the api call saves it to a variable that is returned
        const json = await res.json();

        return json;
    },

    // method for creating a new workout - this creates an empty workout that will only have an id and timestamp;  uses update route to add exercises to the workout
    async createWorkout(data = {}) {
        const res = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });

        const json = await res.json();

        return json;
    },

    // method for getting all workout data
    async getWorkoutsInRange() {
        const res = await fetch(`/api/workouts/range`);
        const json = await res.json();

        return json;
    },
},