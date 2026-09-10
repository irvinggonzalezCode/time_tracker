// Cached references to the DOM elements the timer controls.
// These elements always exist on the page (they're not created/destroyed
// while the app runs), so we only need to look them up once instead of
// calling document.getElementById(...) again inside every function.
const startTimerBtn = document.getElementById("start-timer");
const stopTimerBtn = document.getElementById("stop-timer");
const timerUI = document.getElementById("active-timer");
const activeTimerSince = document.getElementById("active-timer-since");
const activeTimerElapsed = document.getElementById("active-timer-elapsed");
const activeTaskName = document.getElementById("active-timer__action");
const actionInput = document.getElementById("active-timer-action");

// Timer state, declared up front with `let` so it's never accidentally
// created as an implicit global the first time a function assigns to it.
let timerId = null;
let startMs = null;

function startTimer() {
	startTimerBtn.disabled = true;
	stopTimerBtn.disabled = false;
	timerUI.hidden = false;
	actionInput.focus();

	startMs = Date.now();
	timerId = setInterval(tick, 1000);
	tick();

	activeTimerSince.textContent = "Started " + formatClockTime(startMs);
	console.log(
		"Timer Start at " + formatClockTime(startMs) + " , millis = " + startMs,
	);
}

function stopTimer() {
	console.log("Stop Timer Pressed");
	const actionInput = document.getElementById("active-timer-action");
	var timerTaskName = "";
	var timerDescription = document.getElementById(
		"active-timer-description",
	).value;
	console.log("Stop Timer - Action Name " + actionInput.value);

	timerUI.hidden = true;
	clearInterval(timerId);
	timerId = null;

	startTimerBtn.disabled = false;
	stopTimerBtn.disabled = true;

	if (timerDescription.trim() === "") {
		timerDescription = "N/A";
	}

	if (actionInput.value.trim() === "") {
		timerTaskName = "Task";
	} else {
		timerTaskName = actionInput.value;
	}
	let id = Date.now();
	const stopMillis = Date.now();

	console.log("TimerDuration " + formatStartStopMillis(startMs, stopMillis));
	console.log(
		"Stop time = " +
			formatClockTime(stopMillis) +
			" , Stop Millis " +
			stopMillis,
	);

	//insert a new empty row (<tr>) at the end of the body
	const newRow = taskTableBody.insertRow(-1);

	// insert new cells (<td>) into the new row
	const cell1 = newRow.insertCell(0);
	const cell2 = newRow.insertCell(1);
	const cell3 = newRow.insertCell(2);
	const cell4 = newRow.insertCell(3);
	const cell5 = newRow.insertCell(4);

	tasks.push({ id, taskAction, taskStartTime, taskEndTime, taskDescription});

	// Add content to the cells
	cell1.textContent = timerTaskName;
	cell2.textContent = formatClockTime(startMs);
	cell3.textContent = formatClockTime(stopMillis);
	cell4.textContent = formatStartStopMillis(startMs, stopMillis);
	cell5.textContent = timerDescription;
}

//Refreshes every 1000 ticks and updates the elapsed time
function tick() {
	const elapsedMs = Date.now() - startMs;
	activeTimerElapsed.textContent = formatElapsedSecond(elapsedMs);
}
