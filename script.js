const taskValue = document.getElementById("task-input");
const addTask = document.getElementById("add-task");
const taskDesc = document.getElementById("taskdetails");
const deleteTas = document.querySelector(".close");
const task = document.querySelector('#task');

addTask.onclick = taskAdd;

taskValue.onkeyup = () => {
    var taskName = taskValue.value;
    if(taskName.charAt(0) == " " || taskName == ""){
        disableBtn();
    } else {
        enableBtn();
    }
}

function disableBtn(){
    taskValue.style.borderBottom="2px solid red";
    addTask.disabled = true;
}

function enableBtn(){
    addTask.disabled = false;
}

function taskAdd(){
    let storedTask = localStorage.getItem("NewTask");
    if(storedTask == null){
        taskArray, taskDescription = [];
    } else {
        taskArray, taskDescription = JSON.parse(storedTask);
    }
    taskArray.push(taskValue.value);
    taskDescription.push(taskDesc.value);
    localStorage.setItem("NewTask", JSON.stringify(taskArray, taskDescription));
    showTasks();
    taskValue.value = "";
    console.log(taskArray); 
    console.log(taskDescription); 
}

function showTasks(){
    document.querySelector('#tasks').style.display="block";
    let newLiTag = "";
    taskArray.forEach((element, index) => {
      newLiTag += `
        <li id="task">
            <p>${element}</p><br>
            <p id="close" class="close" onclick="deleteTask(${index})">x</p>
        </li>`;
    });
    document.querySelector('#tasks').innerHTML = newLiTag;
}

function deleteTask(index){
    let storedTask = localStorage.getItem("NewTask");
    taskArray = JSON.parse(storedTask);
    
    for(var i = 0; i < taskArray.length; i++){
        taskArray.splice(index, 1);
    }
    localStorage.setItem("NewTask", JSON.stringify(taskArray));
    showTasks();
    hidePane();
}

function hidePane(){
    if(taskArray.length == 0){
        document.querySelector('#tasks').style.display = "none";
    }
}