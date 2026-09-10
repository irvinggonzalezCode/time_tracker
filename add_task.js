/* ============================================================
   add_task.js — the "Add Task" popup (a <dialog> box)
   ------------------------------------------------------------
   This file only cares about the popup form: opening it,
   closing it, showing a live duration while you pick times,
   checking the times make sense, and — when everything is
   good — handing the new task to addTask() over in task.js.
   ============================================================ */

// Grab the popup and its parts once. They live in the HTML the
// whole time the app runs, so looking each up a single time is
// enough (and faster than searching the page again and again).
const taskModal = document.getElementById("task-modal");
const openModalBtn = document.getElementById("add-task");
const closeModalBtn = document.getElementById("close-modal-btn");
const saveTaskBtn = document.getElementById("save-task-btn");
const durationText = document.getElementById("duration-text");
const actionField = document.getElementById("task-action");
const startTimeField = document.getElementById("task-time");
const endTimeField = document.getElementById("task-end-time");
const commentsField = document.getElementById("task-comments");

// openTaskModal — show the popup with a clean, empty form
// -----------------------------------------------------
// form.reset() wipes whatever was typed last time, and we
// reset the duration line to a dash so old numbers don't linger.
function openTaskModal() {
	document.getElementById("task-form").reset();
	durationText.textContent = "—";
	taskModal.showModal();
}

// updateDurationPreview — show how long the chosen times add up to
// ----------------------------------------------------------
// Runs every time the user changes the start or end time box.
// If both times are valid AND the end is after the start, show
// the duration; otherwise just show a dash so we never display
// a negative or nonsense length.
function updateDurationPreview() {
	const startMs = parseTimeInput(startTimeField.value);
	const endMs = parseTimeInput(endTimeField.value);

	if (startMs !== null && endMs !== null && endMs > startMs) {
		durationText.textContent = formatDuration(endMs - startMs);
	} else {
		durationText.textContent = "—";
	}
}

// submitTask — check the form and, if it's good, save the task
// --------------------------------------------------------
//   1. Read what the user typed. Empty action/comments get a
//      sensible default instead of a blank cell.
//   2. Turn the two time boxes into millisecond numbers.
//   3. If a time is missing or the end isn't after the start,
//      stop and tell the user to fix it.
//   4. Otherwise hand a tidy task object to addTask() (which
//      saves + redraws) and close the popup.
function submitTask() {
	const action = actionField.value.trim() || "Task";
	const comments = commentsField.value.trim() || "N/A";
	const startMs = parseTimeInput(startTimeField.value);
	const endMs = parseTimeInput(endTimeField.value);

	if (startMs === null || endMs === null || endMs <= startMs) {
		durationText.textContent = "Pick an end time after the start time";
		return;
	}

	addTask({ action, startMs, endMs, comments });
	taskModal.close();
}

// Connect the buttons and inputs to the functions above.
openModalBtn.addEventListener("click", openTaskModal);
closeModalBtn.addEventListener("click", function () {
	taskModal.close();
});
saveTaskBtn.addEventListener("click", submitTask);
startTimeField.addEventListener("input", updateDurationPreview);
endTimeField.addEventListener("input", updateDurationPreview);
