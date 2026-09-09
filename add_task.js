// JavaScript file for handling task modal interactions
const modal = document.getElementById("task-modal");
const openModalButton = document.getElementById("add-task");
const closeModalButton = document.getElementById("close-modal-btn");
const saveModalButton = document.getElementById("save-task-btn");
const durationTxt = document.getElementById("duration-text");
const taskStartTimeField = document.getElementById("task-time");
const taskEndTimeField = document.getElementById("task-end-time");
const taskTableBody = document.getElementById("task-rows");

var taskStartTime = document.getElementById("task-time").value;
var taskEndTime = document.getElementById("task-end-time").value;
var taskAction = document.getElementById("task-action").value;
var taskDescription = document.getElementById("task-comments").value;
var addTaskBool = false;

const now = new Date();

//Logic for shwoing the dispaly
function addTask() {
	// Implementation for adding a new task
	modal.showModal();
}

// close add task popup from modal menu
closeModalButton.addEventListener("click", function () {
	modal.close();
});

taskStartTimeField.addEventListener("input", updateDuration);
taskEndTimeField.addEventListener("input", updateDuration);

function updateDuration() {
  durationTxt.textContent = formatMinutesElapsed(calculateDuration(document.getElementById("task-time").value, document.getElementById("task-end-time").value));
	console.log("updateDuration");
}

//Submit Task Button
saveModalButton.addEventListener("click", function () {
	taskStartTime = document.getElementById("task-time").value;
	taskEndTime = document.getElementById("task-end-time").value;
	taskAction = document.getElementById("task-action").value;
	taskDescription = document.getElementById("task-comments").value;

	const duration = calculateDuration(taskStartTime,taskEndTime);
  durationTxt.textContent = formatMinutesElapsed(duration);

	console.log(
		now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
	);
	console.log(
		"Task action = " +
			taskAction +
			" , Description  = " +
			taskDescription +
			" , duration  = " +
			duration +
			" , addTaskBool = " +
			addTaskBool,
	);
	console.log(taskAction);
	if (addTaskBool && taskAction) {
		console.log("Task data good, adding row logic");
		console.log("Data to add ");
		console.log("Task action " + taskAction);
		console.log("TaskStartTime " + taskStartTime);
		console.log("taskEndTime " + taskEndTime);
		console.log("duration " + duration);
		console.log("taskDescription " + taskDescription);

		//insert a new empty row (<tr>) at the end of the body
		const newRow = taskTableBody.insertRow(-1);

		// insert new cells (<td>) into the new row
		const cell1 = newRow.insertCell(0);
		const cell2 = newRow.insertCell(1);
		const cell3 = newRow.insertCell(2);
		const cell4 = newRow.insertCell(3);
		const cell5 = newRow.insertCell(4);

		// Add content to the cells
		cell1.textContent = taskAction;
		cell2.textContent = formatHHMM(taskStartTime);
		cell3.textContent = formatHHMM(taskEndTime);
		cell4.textContent = formatMinutesElapsed(duration);
		cell5.textContent = taskDescription;

		durationTxt.textContent = "Duration";
		modal.close();
	} else {
		saveModalButton.classList.add("error");
		console.log("Not adding task");
	}
});
