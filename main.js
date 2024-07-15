const taskInputEl = document.getElementById("taskDescription");
const timeInputEl = document.getElementById("taskTime");
const addTaskButton = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const currentDate = document.getElementById("currentDate");

// Code for displaying the current date on the page
let formattedDate = new Date().toLocaleString("default", {
  month: "short",
  weekday: "short",
  day: "numeric",
  year: "numeric",
});

currentDate.innerHTML = `Today is ${formattedDate}`;

// Class for creating the items and its functions
class Planner {
  constructor() {
    this.taskLiEl = [];
    this.loadTasks();
  }

  // Function for creating the items
  createTask(taskValue, timeValue) {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between");
    li.textContent = `${timeValue}: ${taskValue}`;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("btn", "btn-danger", "btn-sm");
    li.appendChild(removeButton);
    taskList.appendChild(li);
    const newTask = {
      id: new Date().valueOf(),
      time: timeValue,
      description: taskValue,
      element: li,
    };
    this.taskLiEl.push(newTask);
    this.saveTasks();

    this.highlightTasks();

    // Function for removing the items from the HTML and from the array
    removeButton.addEventListener("click", () => {
      const confirmRemove = confirm(
        "Are you sure you want to remove this task?"
      );
      if (confirmRemove) {
        li.remove();
        this.taskLiEl = this.taskLiEl.filter((el) => el.id !== newTask.id);
        this.saveTasks();
      }
    });
  }

  // Checking if the current time matches input time
  highlightTasks() {
    let date = new Date();
    let currentHour = date.getHours();
    let currentMinute = date.getMinutes();
    let currentTotalMinutes = currentHour * 60 + currentMinute;

    this.taskLiEl.forEach((task) => {
      let taskTimeSplit = task.time.split(":");
      let taskHour = +taskTimeSplit[0];
      let taskMinute = +taskTimeSplit[1];
      let taskTotalMinutes = taskHour * 60 + taskMinute;

      if (taskTotalMinutes <= currentTotalMinutes) {
        task.element.style.backgroundColor = "#FFEEBA";
      }
    });
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.taskLiEl));
  }

  loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      tasks.forEach((task) => {
        this.createTask(task.description, task.time);
      });
    }
    this.highlightTasks();
  }
}

let firstClassInstance = new Planner();

// Creating new tasks on click
addTaskButton.addEventListener("click", () => {
  const taskValue = taskInputEl.value.trim();
  const timeValue = timeInputEl.value.trim();

  if (timeValue === "" && taskValue === "") {
    alert("Please enter both time and task description.");
    console.log("Interval cleared due to empty time and task description.");
    clearInterval(intervalId);
    return;
  }

  firstClassInstance.createTask(taskValue, timeValue);

  taskInputEl.value = "";
  timeInputEl.value = "";
});

// Check tasks every second
const intervalId = setInterval(() => {
  firstClassInstance.highlightTasks();
  console.log("Interval is running");
}, 1000);
