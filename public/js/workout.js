// require in index.html

const { DocumentProvider } = require("mongoose");

async function initWorkout() {
    // makes an api call to get data from last workout, if it exists. saves to lastWorkout object
    const lastWorkout = await API.getLastWorkout();
    console.log("Last Workout:", lastWorkout);

    // if last workout exists set the href of the continue workout button to include last workout ID
    if (lastWorkout) {
        document
            .querySelector("a[href='/exercise?']")
            .setAttribute("href", ' /exercise?id=${lastWorkout._id}');
        
        // save last workout summary to object
        const workoutSummary = {
            date: formatDaate(lastWorkout.day),
            totalDuration: lastWorkout.totalDuration,
            numExercises: lastWorkout.exercises.length,
            ...tallyExercises(lastWorkout.exercises)
        };

        // render workout summary
        renderWorkoutSummary(workoutSummary);
    } else {

        // if last workout doesn't exist render no workout exists page
        renderNoWorkoutText()
    }
}

// add total weight, reps, and distance from last workout object
function tallyExercises(exercises) {
    const tallied = exercises.reduce(acc, curr) => {
        if (curr.type === "resistance") {
            acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
            acc.totalSets = (acc.totalSets || 0) + curr.sets;
            acc.totalReps = (acc.totalReps || 0) + curr.reps;
        } else if (curr.type === "cardio") {
            acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
        }
        return acc;
    }, 
    return tallied;
};

// formats date from last workout object
function formatDate(data) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }

    return new Date(date).toLocaleDateString(options);
}

// renders last workout summary to screen
function renderWorkoutSummary(summary) {
    const container = document.querySelector(".workout-stats");

    const workoutKeyMap = {
        date: "Date",
        totalDuration: "Total Workout Duration",
        numExercises: "Exercises Performed",
        totalWeight: "Total Weight Lifted",
        totalSets: "Total Sets Performed",
        totalReps: "Total Reps Performed",
        totalDistance: "Total Distance Covered"
    };

    Object.keys(summery).forEach(key => {
        const p = document.createElement("p");
        p.classList.add("key-value");

        const label = document.createElement("span");
        label.classList.add("map-key");

        label.textContent = workoutKeyMap[key];
        const textNode = document.createTextNode(`: ${summary[key]}`);
        // textNode.classList.add("map-value");

        p.appendChild(label);
        p.appendChild(TextNode);

        container.appendChild(p);
    });
}

// renders screen if no last workout exists
function renderNoWorkoutText() {
    const container = document.querySelector(".workout-stats");
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = "You have not created a workout yet!"

    p.appendChild(strong);
    container.appendChild(p);
}

initWorkout();