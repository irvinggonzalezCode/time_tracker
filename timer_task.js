/* ============================================================
   timer_task.js — the live stopwatch
   ------------------------------------------------------------
   "Start Timer For Task" shows a little panel and counts up
   once a second. "Stop" hides the panel and turns the time you
   measured into a finished task by calling addTask() in
   task.js — the exact same door the popup uses.
   ============================================================ */

// The panel and its parts. They're always in the HTML, so we
// look them up once here.
const startTimerBtn = document.getElementById("start-timer");
const stopTimerBtn = document.getElementById("stop-timer");
const timerPanel = document.getElementById("active-timer");
const timerActionInput = document.getElementById("active-timer-action");
const timerDescriptionInput = document.getElementById("active-timer-description");
const timerSinceText = document.getElementById("active-timer-since");
const timerElapsedText = document.getElementById("active-timer-elapsed");

// The timer's memory.
//   intervalId   — the "ticket" setInterval hands back; we need
//                  it later to switch the ticking off again.
//   timerStartMs — the moment we pressed Start.
// Both are null while the timer is NOT running.
let intervalId = null;
let timerStartMs = null;

// startTimer — begin counting
// ---------------------------
// Remember the start moment, flip the buttons so you can't
// start twice, reveal the panel, and put the cursor in the
// "what are you working on?" box. We call tick() once right
// away so it shows "0s" instead of a blank second, then ask
// the browser to call tick() again every 1000ms.
function startTimer() {
	timerStartMs = Date.now();

	startTimerBtn.disabled = true;
	stopTimerBtn.disabled = false;
	timerPanel.hidden = false;
	timerActionInput.focus();

	timerSinceText.textContent = "Started " + formatClock(timerStartMs);
	tick();
	intervalId = setInterval(tick, 1000);
}

// tick — runs once per second while the timer is going
// ---------------------------------------------------
// Work out how long it's been (now minus the start moment) and
// write that into the big elapsed-time readout.
function tick() {
	timerElapsedText.textContent = formatDuration(Date.now() - timerStartMs);
}

// stopTimer — stop counting and save the result as a task
// -----------------------------------------------------
//   1. If the timer wasn't running, do nothing.
//   2. Switch the ticking off.
//   3. Read the action + description (blank gets a default).
//   4. Hand it to addTask(), which saves it and redraws the
//      table — the same path the popup uses.
//   5. Reset the panel and buttons back to their resting state.
function stopTimer() {
	if (timerStartMs === null) return;

	clearInterval(intervalId);
	intervalId = null;

	const endMs = Date.now();
	const action = timerActionInput.value.trim() || "Task";
	const comments = timerDescriptionInput.value.trim() || "N/A";

	addTask({ action, startMs: timerStartMs, endMs, comments });

	timerStartMs = null;
	timerPanel.hidden = true;
	timerActionInput.value = "";
	timerDescriptionInput.value = "";
	startTimerBtn.disabled = false;
	stopTimerBtn.disabled = true;
}

// Connect the two buttons.
startTimerBtn.addEventListener("click", startTimer);
stopTimerBtn.addEventListener("click", stopTimer);
