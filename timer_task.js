// Cached references to the DOM elements the timer controls.
// These elements always exist on the page (they're not created/destroyed
// while the app runs), so we only need to look them up once instead of
// calling document.getElementById(...) again inside every function.
const startTimerBtn = document.getElementById("start-timer");
const stopTimerBtn = document.getElementById("stop-timer");
const timerUI = document.getElementById("active-timer");
const activeTimerSince = document.getElementById("active-timer-since");
const activeTimerElapsed = document.getElementById("active-timer-elapsed");

// Timer state, declared up front with `let` so it's never accidentally
// created as an implicit global the first time a function assigns to it.
let timerId = null;
let startMs = null;

function startTimer() {
	startTimerBtn.disabled = true;
	stopTimerBtn.disabled = false;
	timerUI.hidden = false;

	startMs = Date.now();
	timerId = setInterval(tick, 1000);
	tick();

	activeTimerSince.textContent = "Started " + formatClockTime(startMs);
	console.log(
		"Timer Start at " + formatClockTime(startMs) + " , millis = " + startMs,
	);
}

function stopTimer() {
	timerUI.hidden = true;
	clearInterval(timerId);
	timerId = null;

	startTimerBtn.disabled = false;
	stopTimerBtn.disabled = true;

	const stopMillis = Date.now();
	console.log("Stop Timer Pressed");
	console.log(
		"Stop time = " +
			formatClockTime(stopMillis) +
			" , Stop Millis " +
			stopMillis,
	);
}

//Refreshes every 1000 ticks and updates the elapsed time
function tick() {
	const elapsedMs = Date.now() - startMs;
	activeTimerElapsed.textContent = formatElapsedSecond(elapsedMs);
}

