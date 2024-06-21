document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addButton = document.getElementById("addButton");
  const taskList = document.getElementById("taskList");
  let currentTaskItem = null;

  loadTasks();

  addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      addTask(taskText);
      saveTasks();
      taskInput.value = "";
    }
  });

  function addTask(text) {
    const taskItem = document.createElement("li");
    taskItem.className = "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "green-checkbox";
    checkbox.addEventListener("change", () => {
      taskTextSpan.classList.toggle("completed");
      saveTasks();
    });

    const taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = text;

    const iconsDiv = document.createElement("div");
    iconsDiv.className = "icons";

    const editButton = document.createElement("button");
    editButton.innerHTML = "✏️";
    editButton.addEventListener("click", () => {
      currentTaskItem = taskItem;
      document.getElementById("editTaskInput").value = text;
      openPopup("editPopup");
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "🗑️";
    deleteButton.addEventListener("click", () => {
      currentTaskItem = taskItem;
      document.getElementById("deletePopupMessage").textContent = `Are you sure to delete "${text}"?`;
      openPopup("deletePopup");
    });

    iconsDiv.appendChild(editButton);
    iconsDiv.appendChild(deleteButton);

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(iconsDiv);

    taskList.appendChild(taskItem);
  }

  document.getElementById("editTaskButton").addEventListener("click", () => {
    const newText = document.getElementById("editTaskInput").value.trim();
    if (newText) {
      currentTaskItem.querySelector("span").textContent = newText;
      saveTasks();
      closePopup("editPopup");
    }
  });

  document.getElementById("deleteTaskButton").addEventListener("click", () => {
    taskList.removeChild(currentTaskItem);
    saveTasks();
    closePopup("deletePopup");
  });

  function saveTasks() {
    const tasks = [];
    const taskItems = taskList.querySelectorAll(".task");
    taskItems.forEach((taskItem) => {
      const taskText = taskItem.querySelector("span").textContent;
      const taskCompleted = taskItem.querySelector("input").checked;
      tasks.push({ text: taskText, completed: taskCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      addTask(task.text);
      const taskItem = taskList.lastElementChild;
      const checkbox = taskItem.querySelector("input");
      checkbox.checked = task.completed;
      if (task.completed) {
        taskItem.classList.add("completed");
      }
    });
  }
});

function openPopup(popupId) {
  document.getElementById(popupId).style.display = "block";
}

function closePopup(popupId) {
  document.getElementById(popupId).style.display = "none";
}
