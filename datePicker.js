//Gets the html element
const dayPicker = document.getElementById("day-picker");

//Adds Listener for changes in the date picker by users
dayPicker.addEventListener("change", function () {
    //gets the date and formats it to millis 
	selectedDayMs = new Date(dayPicker.value + "T00:00:00").getTime();
	renderTasks();
});

dayPicker.value = toInputDate(new Date(selectedDayMs));
loadTasks();