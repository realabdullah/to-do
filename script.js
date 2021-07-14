const taskValue = document.getElementById("task-input");
const addTask = document.getElementById("add-task");
const deleteTas = document.querySelector(".close");
const task = document.querySelector('#task');

addTask.onclick = taskAdd;


window.onload = () => {
    taskArray = JSON.parse(localStorage.getItem('taskArray'));
}

taskValue.onkeyup = () => {
    var taskName = taskValue.value;
    if (taskName.charAt(0) == " " || taskName == "") {
        disableBtn();
    } else {
        enableBtn();
    }
}

function taskAdd() {
    let storedTask = localStorage.getItem("NewTask");
    if (storedTask == null) {
        taskArray = [[]];
    } else {
        taskArray = JSON.parse(storedTask);
    }
    var valueOfTask = {};

    taskTitle = taskValue.value;

    valueOfTask.taskTitle = taskTitle;

    taskArray.push(valueOfTask);
    //taskArray.push([taskValue.value],[taskDesc.value]);
    localStorage.setItem("NewTask", JSON.stringify(taskArray));
    showTasks();
    taskValue.value = "";
    console.log(taskArray);
}

function showTasks() {
    document.querySelector('#tasks').style.display = "block";
    let newLiTag = "";
    newLiTag = `<div class="completed-header">
    <p class="slide-in-elliptic-top-fwd">Tasks</p>
    </div>`;
    taskArray.forEach((element, index) => {
        newLiTag += `
        <ul id="tasks" class="tasks">
            <li class="slide-in-elliptic-top-fwd">
                <p>${element.taskTitle}</p>
                <img src="uncomplete.png" id="close" class="close" onclick="completedTask(${index})" alt="complete">
            </li>
        </ul>`;
    });
    document.querySelector('#tasks').innerHTML = newLiTag;
}

function completedTask(index) {
    document.querySelector('#uncomplete-tasks').style.display = "block";

    let storedTask = localStorage.getItem("NewTask");
    taskArray = JSON.parse(storedTask);

    let newLiTag = "";
    newLiTag = `<div class="uncompleted-header">
    <p class="slide-in-elliptic-top-fwd">Completed Tasks</p>
    </div>`;

    taskArray.forEach((element, index) => {
        newLiTag += `
        <ul id="uncomplete-tasks" class="uncomplete-tasks">
            <li class="slide-in-elliptic-top-fwd">
                <p>${element.taskTitle}</p>
                <img src="complete.png" id="close" class="close" onclick="deleteTask(${index})" alt="complete">
            </li>
        </ul>`;
        taskArray.splice(index, 1);
    });
    document.querySelector('#uncomplete-tasks').innerHTML = newLiTag;
}

function deleteTask(index) {
    let storedTask = localStorage.getItem("NewTask");
    taskArray = JSON.parse(storedTask);

    for (var i = 0; i < taskArray.length; i++) {
        taskArray.splice(index, 1);
    }
    localStorage.setItem("NewTask", JSON.stringify(taskArray));
    completedTask();
    hidePane();
}

function hidePane() {
    if (taskArray.length == 0) {
        document.querySelector('#tasks').style.display = "none";
    }
}