// JavaScript file for handling task modal interactions
const modal = document.getElementById("task-modal");
const openModalButton = document.getElementById("add-task");
const closeModalButton = document.getElementById("close-modal-btn");
const saveModalButton = document.getElementById("save-task-btn")


//Logic for shwoing the dispaly
function addTask() { 
    // Implementation for adding a new task
    modal.showModal();
}

// add task from modal menu 
closeModalButton.addEventListener("click", function() {
    modal.close();
});

saveModalButton.addEventListener("click", function() {
    const taskAction = document.getElementById("task-action").value;
    const taskStartTime = document.getElementById("task-time").value;
    const taskDescription = document.getElementById("task-comments").value;
    alert("task  name = " + taskAction + " time = " + taskStartTime + " , task description = " + taskDescription);
    console.log("me awesome")
});
