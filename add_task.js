// JavaScript file for handling task modal interactions
const modal = document.getElementById("task-modal");
const openModalButton = document.getElementById("add-task");
const closeModalButton = document.getElementById("close-modal");
const saveTaskButton = document.getElementById("save-task-btn");

function addTask() {
    // Implementation for adding a new task
    modal.style.display = "block";
}

saveTaskButton.addEventListener("click", function() {
    // Implementation for saving the new task
    alert("Task saved!");
});


