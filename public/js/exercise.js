// required in exercise.html

// create variables for our DOM elements
const workoutTypeSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const cardioNameInput = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const resistanceDurationInput = document.querySelector("#resistance-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const newWorkout = document.querySelector(".new-workout");

let workoutType = null;
let shouldNavigateAway = false;

async function initExercise() {
    let workout;

    // if no workout id exists create a new workout
    if (location.search.split("=")[1] === undefined) {
        workout = await API.createWorkout()
    }

    // if workout exists add workout id to url
    if (workout) {
        location.search = "?id=" + workout._id;
    }

}

// when page loads check for workout id or create new workout
initExercise();
    
// render form based on workout type chosen
function handleWorkoutTypeChange(event) {
    workoutType = event.target.value;

    if (workoutType === "cardio") {
        cardioForm.classList.remove("d-none");
        resistanceForm.classList.add("d-none");
    } else if (workoutType === "resistance") {
        resistanceForm.classList.remove("d-none");
        cardioForm.classList.add("d-none");
    } else {
        cardioForm.classList.add("d-none");
        resistanceForm.classList.add("d-none");
    }

    validateInputs();
}

// if input type is empty, don't allow user to click on add or complete button
function validateInputs() {
    let isValid = true;

    if (workoutType === "resistance") {
        if (nameInput.value.trim() === "") {
            isValid = false;
        }

        if (weightInput.value.trim() === "") {
            isValid = false;
        }

        if (setsInput.value.trim() === "") {
            isValid = false;
        }

        if (repsInput.value.trim() === "") {
            isValid = false;
        }

        if (resistanceDurationInput.value.trim() === "") {
            isValid = false;
        }
    } else if (workoutType === "cardio") {
        if (cardioNameInput.value.trim() === "") {
            isValid = false;
        }

        if (durationInput.value.trim() === "") {
            isValid = false;
        }

        if (distanceInput.value.trim() === "") {
            isValid = false;
        }
    }

    if (isValid) {
        completeButton.removeAttribute("disabled");
        addButton.removeAttribute("disabled");
    } else {
        completeButton.setAttribute("disabled", true);
        addButton.setAttribute("disabled", true);
    }
}

// handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();

    // create workoutData object, properties depend on exercise type chosen
    let workoutData = {};

    if (workoutType === "cardio") {
        workoutData.type = "cardio";
        workoutData.name = cardioNameInput.value.trim();
        workoutData.distance = Number(distanceInput.value.trim());
        workoutData.duration = Number(durationInput.value.trim());
    } else if (workoutType === "resistance") {
        workoutData.type = "resistance";
        workoutData.name = nameInput.value.trim();
        workoutData.weight = Number(weightInput.value.trim());
        workoutData.sets = Number(setsInput.value.trim());
        workoutData.reps = Number(repsInput.value.trim());
        workoutData.duration = Number(resistanceDurationInput.value.trim());
    }

    // add an exercise (a PUT request to update workout document by updating it's exercise array) using the newly created workoutData object
    await API.addExercise(workoutData);
    completeButton.setAttribute("disabled", true);
    addButton.setAttribute("disabled", true);
    clearInputs();
    toast.classList.add("success");
}

// handles workout successfully added pop up, redirects to homepage
function handleToastAnimationEnd() {
    toast.removeAttribute("class");
    if (shouldNavigateAway) {
        location.href = "/";
    }
}

function clearInputs() {
    cardioNameInput.value = "";
    nameInput.value = "";
    setsInput.value = "";
    distanceInput.value = "";
    durationInput.value = "";
    repsInput.value = "";
    resistanceDurationInput.value = "";
    weightInput.value = "";
}

// event listeners for form and buttonos
if (workoutTypeSelect) {
    workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
}
if (completeButton) {
    completeButton.addEventListener("click", function (event) {
        shouldNavigateAway = true;
        handleFormSubmit(event);
    });
}
if (addButton) {
    addButton.addEventListener("click", handleFormSubmit);
}
toast.addEventListener("animationend", handleToastAnimationEnd);

document
    .querySelectorAll("input")
    .forEach(element => element.addEventListener("input", validateInputs));