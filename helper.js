// Formats a millisecond timestamp into a clock string like "9:00 AM".
// Both startTimer and stopTimer need this exact formatting, so it lives
// here once instead of being copy-pasted in both places.
function formatClockTime(millis) {
	return new Date(millis).toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});
}

//Formats millis time to easily readable string format
function formatElapsedSecond(elapsedMs) {
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

//Formats millis time to easily readable string format
function formatMinutesElapsed(elapsedMinutes) {
	const hours = Math.floor(elapsedMinutes / 60);
	const minutes = elapsedMinutes;

	const parts = [];

	if (hours > 0) parts.push(hours + " hr");
	if (minutes > 0)
		parts.push(minutes + (minutes === 1 ? " minute" : " minutes"));

	if (parts.length === 0) return "0 seconds";

	console.log("FormatMinutesElapsed = " + parts);

	return parts.join(" ");
}

//Format HH:00
function formatHHMM(hhmmString) {
	var hh = hhmmString.split(":")[0];
	const mm = hhmmString.split(":")[1];

	if (parseInt(hh) > 11) {
		if (parseInt(hh) !== 12) {
			hh = parseInt(hh) - 12;
			} else {
				hh = "12";
			}
			const finalString = hh + ":" + mm + " PM";
			console.log("finalString " + finalString);
			return finalString;
	} else {
		const finalString = hh + ":" + mm + " AM";
		console.log("finalString " + finalString);
		return finalString;
	}
}
