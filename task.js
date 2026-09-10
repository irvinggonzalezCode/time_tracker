/* ============================================================
   task.js — the notebook that remembers your finished tasks
   ------------------------------------------------------------
   Everything about the *list of finished tasks* lives here:
   holding them in memory, drawing them in the table, saving
   them inside the browser so they survive a page refresh, and
   loading them back.

   Both the "Add Task" popup and the live timer add tasks by
   calling addTask() below. One door in means the table and the
   saved copy can never drift apart.
   ============================================================ */

// The label we file our saved tasks under inside the browser's
// localStorage. Think of it as the name written on a drawer.
const STORAGE_KEY = "tt.tasks";

// The list of tasks while the page is open. Each task is a
// small object shaped like this:
//   { id, action, startMs, endMs, comments }
// startMs and endMs are those big "milliseconds since 1970"
// numbers, so we can subtract them to get a duration.
let tasks = [];

// renderTasks — draw every task in `tasks` into the table
// ------------------------------------------------------
// We empty the table body first so a task can never show up
// twice, then add one row per task. The five cells are built
// in the same order as the column headers in the HTML.
function renderTasks() {
	const tableBody = document.getElementById("task-rows");
	tableBody.innerHTML = "";

	tasks.forEach(function (task) {
		const row = tableBody.insertRow();

		const cells = [
			task.action,
			formatClock(task.startMs),
			formatClock(task.endMs),
			formatDuration(task.endMs - task.startMs),
			task.comments,
		];

		cells.forEach(function (text) {
			row.insertCell().textContent = text;
		});
	});
}

// addTask — add one finished task to the list
// -------------------------------------------
// This is the ONLY place a task should be added. It gives the
// task a unique id, puts it in the list, saves the list, and
// redraws the table so the screen matches what we stored.
function addTask(task) {
	task.id = crypto.randomUUID();
	tasks.push(task);
	saveTasks();
	renderTasks();
}

// removeLastTask — undo the most recently added task
// -------------------------------------------------
// This is what the "Remove Task" button does. If the list is
// already empty, there's nothing to remove, so we quietly do
// nothing.
function removeLastTask() {
	if (tasks.length === 0) return;
	tasks.pop();
	saveTasks();
	renderTasks();
}

// saveTasks — copy the whole list into long-term browser storage
// ----------------------------------------------------------
// localStorage can only hold text, so we turn the list of
// objects into a JSON string on the way in.
function saveTasks() {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// loadTasks — bring the saved list back when the page opens
// -------------------------------------------------------
//   - Nothing saved yet?  Start with an empty list.
//   - Something saved but damaged/unreadable?  Don't crash:
//     log the problem and start fresh.
// Either way, redraw the table at the end.
function loadTasks() {
	const saved = localStorage.getItem(STORAGE_KEY);

	if (saved === null) {
		tasks = [];
	} else {
		try {
			tasks = JSON.parse(saved);
		} catch (error) {
			console.error("Saved tasks were unreadable — starting fresh.", error);
			tasks = [];
		}
	}

	renderTasks();
}
