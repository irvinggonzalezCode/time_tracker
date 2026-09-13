/* ============================================================
   server.js — the kitchen
   ------------------------------------------------------------
   This is the backend: the one place that will eventually hold
   the real task data. Right now it doesn't store anything yet —
   it just proves that a request can go out from a browser, get
   handled by this program, and a response can come back.
   ============================================================ */

// require() is Node's way of pulling in a toolkit. Unlike your
// frontend files (which all share one big room just by being
// listed as <script> tags), nothing is shared automatically
// here — you have to explicitly ask for what you want. This
// line asks for the Express toolkit and stores it in `express`.
const express = require("express");

// Build one fresh "app" — this is the kitchen itself. Every
// route you define below gets attached to this same app.
const app = express();

// The "door number" this server listens on. Many programs can
// run on your computer at once; each one picks its own port so
// requests don't get mixed up between them.
const PORT = 3000;

// A route: "when a GET request comes in for the address '/',
// run this function."
//   - req (the request)  = the incoming order slip. It holds
//     whatever the visitor sent along with their request.
//   - res (the response) = the blank plate you get to fill in
//     and hand back.
app.get("/", (req, res) => {
	// Put text on the plate and send it out the door.
	res.send("Hello from the Time Tracker backend!");
});

// Actually open the kitchen for business. Nothing above this
// line does anything by itself — app.listen() is what starts
// the server actually waiting for requests to arrive. The
// second argument is a function that runs once, right when the
// server successfully starts, just to let you know it worked.
app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
