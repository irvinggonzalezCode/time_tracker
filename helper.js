/* ============================================================
   helper.js — tiny "make it pretty" tools
   ------------------------------------------------------------
   These functions never touch the page by themselves. You
   give one a number (or a bit of text) and it hands back a
   nicer-looking piece of text. The other files borrow these
   tools so the tricky bits are only written once, in one
   place.
   ============================================================ */

// formatClock — turn a moment in time into a friendly clock label
// --------------------------------------------------------------
// The computer stores a moment as "milliseconds since 1970": a
// giant number like 1757437200000. People don't read that. We
// hand that number to the browser's built-in date tool and ask
// for "hour and minute with AM/PM", so we get back "9:05 AM".
function formatClock(millis) {
	return new Date(millis).toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});
}

// formatDuration — turn a length of time into words like "1h 5m"
// -----------------------------------------------------------
// `millis` is how long something lasted, in milliseconds.
//   1. Change it to whole seconds (and never let it go below 0).
//   2. Split those seconds into hours, minutes, and seconds.
//   3. Only mention the pieces that aren't zero, so we say
//      "2m 3s" instead of "0h 2m 3s". Seconds are hidden once
//      we're into hours, because nobody cares about 7 seconds
//      on a 3-hour task.
// If it was shorter than one second, we just say "0s".
function formatDuration(millis) {
	const totalSeconds = Math.max(0, Math.floor(millis / 1000));

	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor(totalSeconds / 60) % 60;
	const seconds = totalSeconds % 60;

	const parts = [];
	if (hours > 0) parts.push(hours + "h");
	if (minutes > 0) parts.push(minutes + "m");
	if (seconds > 0 && hours === 0) parts.push(seconds + "s");

	return parts.length > 0 ? parts.join(" ") : "0s";
}

// parseTimeInput — turn the value of an <input type="time"> into a real moment
// -----------------------------------------------------------------------
// A time input gives us text like "09:30" on a 24-hour clock.
// We take today's date, poke those hours and minutes into it,
// and return the big milliseconds number so the rest of the
// app can do math with it (like "end minus start").
// If the text is missing or doesn't look like a time, we return
// null, which everywhere else reads as "no valid time yet".
function parseTimeInput(value) {
	if (!value || !value.includes(":")) return null;

	const [hoursText, minutesText] = value.split(":");
	const hours = Number(hoursText);
	const minutes = Number(minutesText);

	if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;

	const moment = new Date();
	moment.setHours(hours, minutes, 0, 0);
	return moment.getTime();
}

// formatToday — today's date as a friendly label, e.g. "September 9, 2026"
function formatToday() {
	return new Date().toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
