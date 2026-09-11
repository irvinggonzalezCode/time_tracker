/* ============================================================
   main.js — the "on" switch
   ------------------------------------------------------------
   Every other file just *defines* things (functions, values).
   Nothing actually happens until this file runs. It:
     - writes today's date at the top of the page,
     - loads any tasks you saved on a previous visit,
     - connects the "Remove Task" button.

   It's listed last in home.html and every <script> uses
   `defer`, so by the time this runs the whole page exists and
   all the other files' functions are ready to call.
   ============================================================ */

document.getElementById("current-date").textContent = formatToday();
loadTasks();
