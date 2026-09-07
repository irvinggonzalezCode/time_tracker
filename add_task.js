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

// close add task popup from modal menu 
closeModalButton.addEventListener("click", function() {
    modal.close();
});

//Submit Task Button
saveModalButton.addEventListener("click", function() {

    const taskAction = document.getElementById("task-action").value;
    const taskStartTime = document.getElementById("task-time").value;
    const taskEndTime = document.getElementById("task-end-time").value;
    const taskDescription = document.getElementById("task-comments").value;
    console.log("task end time = " + taskEndTime);
    console.log("task start time = " + taskStartTime);

    const intStartTime = (taskStartTime.split(":")[0] * 60) + parseInt(taskStartTime.split(":")[1]);
    console.log("Start time = " + intStartTime);
    const intEndTime = (taskEndTime.split(":")[0] * 60) + parseInt(taskEndTime.split(":")[1]);
    console.log("End time = " + intEndTime);
    const taskduration = intEndTime - intStartTime;
    console.log("Duration in minutes = " + taskduration);

    if (intEndTime <= intStartTime) {
        alert("End task time can not be earlier than the start time.");
        } else {
                modal.close();
            }
});
