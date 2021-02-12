init();

async function init() {

  // splits the url at the =
  if (location.search.split("=")[1] === undefined) {

    // saves the last workout to the workout variable
    const workout = await API.getLastWorkout();

    // if workout variable exists add that workout ID to the url to pull up this workout data
    if (workout) {
      location.search = "?id=" + workout._id;
    } else {

      // if no previous workout exists remove the continue workout button
      document.querySelector("#continue-btn").classList.add("d-none");
    }
  }
}