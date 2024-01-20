const tasksDiv = document.querySelector(".taskAddition");
const inputBox = document.querySelector("#inputTask");
const addTaskIcon = document.getElementById("addTaskIcon");
const completeTasks = document.getElementById("completeTasks");
const clearCompleted = document.getElementById("clearCompleted");
const taskDetails = document.querySelector(".taskDetails");
const taskCount = document.querySelector("#taskCount");
const alltasksBtn = document.querySelector("#alltasks");
const completedtasksBtn = document.querySelector("#completedtasks");
const incompletetasksBtn = document.querySelector("#incompletetasks");
const scrollLimit = 5;
let numTasks = 0;

//Function to add a task to the list
function addTask() {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.setAttribute("data-status", "incompleted");
  if (inputBox.value != "") {
    taskDiv.innerHTML = `
    <div class="innerTask">
    <button class='indTaskBtn allTasksComplete' onClick="strikeTask(this)"><img src="./images/circle.png" alt='task incomplete icon' id='incompleteIcon' ></button>
    <p id='para'>${inputBox.value}</p>
    </div>
    <button class='indTaskBtn' onClick="removeTask(this)"><img src="./images/remove.jpg" alt='remove task icon' id='removeIcon' ></button>
    </div>
    `;
    numTasks++;
    updateTaskCount();
  } else {
    alert("Please Enter a task");
    return;
  }
  tasksDiv.appendChild(taskDiv);
  inputBox.value = "";
  saveData();
  checkScroll();
}

// Function to mark individual task as completed
function strikeTask(e) {
  const image = e.querySelector("img");
  const taskDiv = e.parentElement.parentElement;

  if (image.src.includes("checkedCircle.png")) {
    image.src = "./images/circle.png";
    taskDiv.classList.remove("changeColorGreen");
    e.parentElement.classList.remove("completed");
    taskDiv.setAttribute("data-status", "incompleted");
  } else {
    image.src = "./images/checkedCircle.png";
    taskDiv.classList.add("changeColorGreen");
    taskDiv.setAttribute("data-status", "completed");
    e.parentElement.classList.add("completed");
  }
  saveData();
}

// Function to mark all tasks as completed
function strikeTaskAll(e) {
  const image = e.querySelector("img");
  const taskDiv = e.parentElement.parentElement;

  image.src = "./images/checkedCircle.png";
  taskDiv.classList.add("changeColorGreen");
  taskDiv.setAttribute("data-status", "completed");
  e.parentElement.classList.add("completed");

  saveData();
}

// Function to remove a task
function removeTask(e) {
  e.parentElement.remove();
  numTasks--;
  updateTaskCount();
  saveData();
}

//Function for saving necessary data to local storage to prevent losing it in case of browser refresh
function saveData() {
  localStorage.setItem("tasks", tasksDiv.innerHTML);
  localStorage.setItem("numOfTasks", numTasks);
}

//Function to show tasks (if added earlier) by retrieving from local storage
function showTasks() {
  tasksDiv.innerHTML = localStorage.getItem("tasks");
  numTasks = parseInt(localStorage.getItem("numOfTasks")) || 0;
  updateTaskCount();
  checkScroll();
}

// Function to update tasks count in the taskCount Div
function updateTaskCount() {
  numTasks <= 0 ? 0 : numTasks;
  taskCount.innerHTML = `${numTasks} Tasks`;
}

// Function to filter tasks based on status
function filterTasks(status) {
  const allTaskDivs = document.querySelectorAll(".task");

  allTaskDivs.forEach((taskDiv) => {
    const taskStatus = taskDiv.getAttribute("data-status");
    if (status === "all" || taskStatus === status) {
      taskDiv.style.display = "flex";
    } else {
      taskDiv.style.display = "none";
    }
  });
}

// Function to check if scrolling should be enabled
function checkScroll() {
  if (numTasks >= scrollLimit) {
    tasksDiv.style.overflowY = "auto";
    tasksDiv.style.maxHeight = "200px";
  }
}

completeTasks.addEventListener("click", function () {
  const allTasksComplete = document.querySelectorAll(".allTasksComplete");
  allTasksComplete.forEach((btn) => strikeTaskAll(btn));
});

clearCompleted.addEventListener("click", function () {
  const completed = document.querySelectorAll(".completed");
  completed.forEach((btnDiv) => removeTask(btnDiv));
});

addTaskIcon.addEventListener("click", addTask);
inputBox.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    addTask();
  }
});

updateTaskCount();
showTasks();
