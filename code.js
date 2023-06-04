// linking my buttons, input and list 
const taskInput = document.getElementById("input");
const addButton = document.getElementById("addButton");
const sortButton = document.getElementById("sortButton");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", addTask);
sortButton.addEventListener("click", sorttTasks);
document.addEventListener("DOMContentLoaded", loadTasks);

// function to add task
function addTask() {
  const task = taskInput.value.trim();
  if (task === "") {
    alert("Item name cannot be empty.");
    return;
  }

  if (task.length < 3) {
    alert("Item name must have more than three characters.");
    return;
  }
  if (task.charAt(0) === task.charAt(0).toLowerCase()) {
    alert("The first character should be in uppercase!");
    return;
  }
  
  
  const listItem = createTaskListItem(task);
  taskList.appendChild(listItem);

  saveTasks();

  taskInput.value = "";
}

// function to create task
function createTaskListItem(task) {
  const listItem = document.createElement("li");

  const checklistButton = document.createElement("span");
  checklistButton.innerHTML = "&#x2713;";
  checklistButton.classList.add("checklist-icon");
  checklistButton.addEventListener("click", toggleChecklist);
  listItem.appendChild(checklistButton);

  const taskText = document.createElement("span");
  taskText.textContent = task;
  taskText.classList.add("task-text");
  listItem.appendChild(taskText);

  const deleteButton = document.createElement("span");
  deleteButton.innerHTML = "&#x1F5D1;"; 
  deleteButton.classList.add("delete-icon");
  deleteButton.addEventListener("click", deleteTask);
  listItem.appendChild(deleteButton);

  return listItem;
}
// funcion to delete task
function deleteTask(event) {
  const listItem = event.target.parentElement;
  taskList.removeChild(listItem);
  saveTasks();
}

function toggleChecklist(event) {
  const listItem = event.target.parentElement;
  listItem.classList.toggle("checked");
  listItem.style.textDecoration = "line-through";

  saveTasks();
}

// Function to save tasks

function saveTasks() {
  const tasks = Array.from(taskList.children).map((item) => {
    return {
      text: item.firstChild.textContent,
      checked: item.classList.contains("checked"),
    };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (!savedTasks) {
    return;
  }
  const tasks = JSON.parse(savedTasks);
  tasks.forEach((task) => {
    const listItem = createTaskListItem(task.text);
    if (task.checked) {
      listItem.classList.add("checked");
    }
    taskList.appendChild(listItem);
  });
}

// function to sot tasks
function sorttTasks() {
  let list, i, switching, b, shouldSwitch;
  list = document.querySelector('ul');
  switching = true;
  while (switching) {
    switching = false;
    b = list.getElementsByTagName("LI");
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}