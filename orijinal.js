const taskValue = document.getElementById("task-input");
const addTask = document.getElementById("add-task");
const taskDescription = document.getElementById("taskDescription");
const taskDesc = document.getElementById("taskdetails");
const deleteTas = document.querySelector(".close");
const task = document.querySelector('#task');

addTask.onclick = taskAdd;

function detailsOption() {
    if (taskDescription.checked == true) {
        taskDesc.style.display = "block";
    } else {
        taskDesc.style.display = "none";
    }
}

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

function disableBtn() {
    taskValue.style.borderBottom = "2px solid red";
    addTask.disabled = true;
}

function enableBtn() {
    addTask.disabled = false;
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
    taskInfo = taskDesc.value;

    valueOfTask.taskTitle = taskTitle;
    valueOfTask.taskInfo = taskInfo;

    taskArray.push(valueOfTask);
    //taskArray.push([taskValue.value],[taskDesc.value]);
    localStorage.setItem("NewTask", JSON.stringify(taskArray));
    showTasks();
    taskValue.value = "";
    taskDesc.value = "";
    console.log(taskArray);
}

function showTasks() {
    document.querySelector('#tasks').style.display = "block";
    let newLiTag = "";
    newLiTag = `<h2>Tasks</h2>`;
    taskArray.forEach((element, index) => {
        if (taskDescription.checked == true) {
            newLiTag += `
            <li id="task">
                <div class="task-info">
                    <h3>${element.taskTitle}</h3><br>
                    <p class="task-desc">${element.taskInfo}</p>
                </div>
                <p id="close" class="close" onclick="deleteTask(${index})">x</p>
            </li>`;
        } else {
            newLiTag += `
            <li id="task">
                <div class="task-info">
                    <h3>${element.taskTitle}</h3> 
                </div>
                <p id="close" class="close" onclick="deleteTask(${index})">x</p>
            </li>`;
        }
    });
    document.querySelector('#tasks').innerHTML = newLiTag;
}

function deleteTask(index) {
    let storedTask = localStorage.getItem("NewTask");
    taskArray = JSON.parse(storedTask);

    for (var i = 0; i < taskArray.length; i++) {
        taskArray.splice(index, 1);
    }
    localStorage.setItem("NewTask", JSON.stringify(taskArray));
    showTasks();
    hidePane();
}

function hidePane() {
    if (taskArray.length == 0) {
        document.querySelector('#tasks').style.display = "none";
    }
}