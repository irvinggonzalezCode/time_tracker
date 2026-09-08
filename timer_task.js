function startTimer() {
	let startTimerBtn = document.getElementById("start-timer");
	let stopTimerBtn = document.getElementById("stop-timer");
    let timerUI = document.getElementById("active-timer");
	startTimerBtn.disabled = true;
	stopTimerBtn.disabled = false;
    timerUI.hidden = false;
	console.log("Start Timer");
	startMs = Date.now();
	const date = new Date(startMs);
	timerId = setInterval(tick, 1000);
	tick();
	const timerStartTxt = document.getElementById("active-timer-action");
	const activeTimerSince = document.getElementById("active-timer-since");

	const formattedTime = date.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});

	activeTimerSince.textContent = "Started " + formattedTime;

	console.log("Timer Start at " + formattedTime + " , millis = " + startMs);
}

function stopTimer() {
    let timerUI = document.getElementById("active-timer");
    timerUI.hidden = true;
	clearInterval(timerId);
	timerId = null;
	let startTimerBtn = document.getElementById("start-timer");
	let stopTimerBtn = document.getElementById("stop-timer");
	startTimerBtn.disabled = false;
	stopTimerBtn.disabled = true;
	let stopMillis = Date.now();
	const date = new Date(stopMillis);
	const formattedTime = date.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});
	console.log("Stop Timer Pressed");
	console.log("Stop time = " + formattedTime + " , Stop Millis" + stopMillis);
}

//Refreshes every 1000 ticks and updates the elapsed time
function tick() {
	const elapsedMs = Date.now() - startMs;
	var elapsedTxt = document.getElementById("active-timer-elapsed");
	elapsedTxt.textContent = formatElapsed(elapsedMs);
}

//Formats millis time to easily readable string format
function formatElapsed(elapsedMs) {
	const totalSeconds = Math.floor(elapsedMs / 1000);

	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor(totalSeconds / 60) % 60;
	const seconds = totalSeconds % 60;

	const parts = [];

	if (hours > 0) parts.push(hours + " hr");
	if (minutes > 0)
		parts.push(minutes + (minutes === 1 ? " minute" : " minutes"));
	if (seconds > 0)
		parts.push(seconds + (seconds === 1 ? " second" : " seconds"));

	if (parts.length === 0) return "0 seconds";

	return parts.join(" ");
}
