# What changed and why — explain-like-I'm-5 edition

This is a study sheet. Every function now has a plain-English comment above
it in the code; this file is about the *bigger* changes — why the new shape
of the project is easier to work with.

---

## The big idea: one door in

**Before:** there were two different ways a task got into the table.

- The **Add Task popup** built a task object and (sort of) saved it.
- The **Stop button** on the timer built a table row *by hand*, cell by
  cell, and pushed a broken object into the list that didn't match.

Because they did different things, the table and the saved list could
disagree. The timer's saved rows were basically garbage (it pushed
variables like `taskAction` that belonged to the *popup* file and were
always empty).

**After:** there is exactly **one** function that adds a task —
`addTask()` in `task.js`. Both the popup and the timer call it. It always:

1. gives the task an id,
2. adds it to the list,
3. saves the list,
4. redraws the table.

**Why it matters:** when there's one door in, the picture on screen and
the saved copy can *never* fall out of sync. If you want to change how
tasks are stored later (a real database, say), you change one function
instead of hunting through three files.

---

## Every task has the same shape now

A task is always:

```js
{ id, action, startMs, endMs, comments }
```

`startMs` and `endMs` are "milliseconds since 1970" — big numbers the
computer uses for time. Storing the raw numbers (not pretty text like
`"9:05 AM"`) means we can always do math on them later: subtract to get a
duration, sort by start time, add up a whole day. Pretty text is only made
at the last second, when we draw the table.

**Why it matters:** if you save `"9:05 AM"` as text, you've thrown away the
ability to calculate with it. Keep data as data; make it pretty only for
the screen.

---

## One duration formatter instead of four

**Before:** `helper.js` had `formatElapsedSecond`, `formatStartStopMillis`,
and `formatMinutesElapsed` — three near-identical functions doing the same
job in slightly different (and buggy) ways. `formatStartStopMillis` had a
line that *always* added the word "1 minutes" no matter the real time, and
it used a variable (`elapsedMs`) it never properly created.

**After:** one function, `formatDuration(millis)`. Give it a length of time
in milliseconds, get back `"1h 5m"` or `"45s"`. Everyone uses it.

**Why it matters:** three copies of a thing means a bug fixed in one copy
still lives in the other two. One copy = fix it once, everywhere gets the
fix. This is the "Don't Repeat Yourself" rule.

---

## No more shared invisible variables between files

**Before:** files reached into each other through globals that were never
clearly declared:

- `add_task.js` set `addTaskBool`, and `helper.js` also set it.
- `timer_task.js` used `taskTableBody`, which only existed because
  `add_task.js` happened to create it.
- `formatStartStopMillis` created `elapsedMs` with no `let`, which
  silently makes a global.

When file A secretly depends on a variable that file B happens to create,
loading them in a different order — or deleting "unused" code — breaks
things in a spot far away that looks unrelated.

**After:** each file owns its own variables. `task.js` owns the task list.
`timer_task.js` owns the timer's `intervalId` and `timerStartMs`.
`add_task.js` owns its form fields. The only things shared on purpose are
the little helper functions, and those are pure — same input, same output,
no hidden state.

**Why it matters:** you can read one file and understand it without holding
the other three in your head.

---

## The app actually loads your saved tasks now

**Before:** `loadTasks()` existed but **nothing ever called it when the
page opened**. So every refresh showed an empty table (plus a fake
hard-coded example row in the HTML). Your saved work was invisible.

**After:** new file `main.js` — the "on" switch. It runs last and does the
three startup jobs: write today's date, call `loadTasks()`, and wire the
"Remove Task" button.

**Why it matters:** "define things" and "start things" are different jobs.
Keeping startup in its own tiny file makes it obvious what happens when the
page opens, and in what order.

---

## Buttons are wired in JavaScript, not in the HTML

**Before:** `<button onclick="startTimer()">`. The HTML had to know the
name of a JavaScript function, and some of those functions
(`removeTask()`) didn't even exist — the button was dead.

**After:** the HTML just gives each button an `id`. The matching JS file
attaches the behaviour with `addEventListener`. `add_task.js` wires the
Add/Save/Cancel buttons, `timer_task.js` wires Start/Stop, `main.js` wires
Remove.

**Why it matters:** HTML describes *what's on the page*; JavaScript decides
*what it does*. Keeping them apart means you can rename a function without
editing HTML, and a search for `addEventListener` shows you every
behaviour in one sweep. It also fixed the dead "Remove Task" button.

---

## Smaller fixes

| Fix | Why it matters |
| --- | --- |
| `<title>` changed from "Developer Portfolio" to "Time Tracker" | It was leftover from a template; the browser tab now says the right thing. |
| Removed the fake example `<tr>` from the table | It was hard-coded HTML pretending to be real data. The table now shows only real tasks. |
| Removed `placeholder` from `<input type="time">` | Time inputs ignore `placeholder` — it was dead text. |
| Removed ~20 `console.log` lines | They were debugging noise. Kept one real `console.error` for when saved data is corrupt — that's an actual problem worth reporting. |
| `var` → `const` / `let` everywhere | `const` says "this never gets reassigned", which is a promise the computer checks for you. `var` has confusing scope rules that cause real bugs. |
| Added missing `</main>` and moved `<footer>` outside `<main>` | The tags now nest correctly instead of relying on the browser to guess. |
| Stop button starts `disabled` in the HTML | It matches the real resting state — you can't stop a timer that isn't running. |
| Empty action/comments get defaults (`"Task"`, `"N/A"`) | No more blank cells in the table. |
| End time must be *after* start time before Save works | Stops negative or zero-length tasks from being saved. |
| Timer shows `0s` immediately on Start | Before, it showed a blank for the first second because `tick()` only ran after the first interval. |

---

## Files now, and what each is for

| File | Job |
| --- | --- |
| `home.html` | The page's structure — what elements exist. No behaviour. |
| `styles.css` | How it all looks. (Unchanged — it was already clean.) |
| `helper.js` | Pure "make it pretty" tools: `formatClock`, `formatDuration`, `parseTimeInput`, `formatToday`. |
| `task.js` | The task list: hold it, draw it, save it, load it. The one `addTask()` door. |
| `add_task.js` | The "Add Task" popup and its validation. |
| `timer_task.js` | The live stopwatch. On stop, it calls `addTask()`. |
| `main.js` | The "on" switch. Runs last, starts everything. |

---

## Good next steps (not done yet)

- Let the user **edit** or delete *any* row, not just remove the last one.
- Turn each `<script>` into an ES module (`import`/`export`) so files
  share things on purpose instead of through the global namespace.
- Add a total-time-today line under the table.
- A tiny test file for `formatDuration` and `parseTimeInput` — they're
  pure functions, so they're easy to test.
