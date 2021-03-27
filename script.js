const taskValue = document.getElementById("task-input");
const addTask = document.getElementById("add-task");
const deleteTas = document.querySelector(".close");
const task = document.querySelector('#task');

addTask.onclick = taskAdd;

taskValue.onkeyup = () => {
    if(taskValue.trim() != 0){
        taskValue.classList.add("error");
    }
}

function taskAdd(){
    let storedTask = localStorage.getItem("NewTask");
    if(storedTask == null){
        taskArray = [];
    } else {
        taskArray = JSON.parse(storedTask);
    }
    taskArray.push(taskValue.value);
    localStorage.setItem("NewTask", JSON.stringify(taskArray));
    showTasks();
    console.log(taskArray);   
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
    taskArray.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(taskArray));
    showTasks();
}