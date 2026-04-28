import {
  addProject,
  deleteProject,
  newProjectInput,
  projectsList,
  saveProjectsToLocalStorage,
} from "./components/project/projectController.js";
import {
  createProjectOption,
  displayProjectOptions,
  loadProjects,
  displayProjectTasks,
} from "./components/project/projectView.js";
import {
  getAllTasks,
  addTask,
  deleteTask,
  editTask,
  filterTasks,
} from "./components/task/taskController.js";
import {
  displayTask,
  loadTaskValues,
  toggleCheckbox,
} from "./components/task/taskView.js";
import { format, isEqual, isAfter } from "date-fns";
import "./style.css";

const header = document.querySelector(".current-project");
const modal = document.querySelector("dialog");
const form = document.getElementById("task-form");
const formTaskButton = document.getElementById("form-task-btn");
const today = format(new Date(), "yyyy-MM-dd");
let mode = "add";
document.getElementById("task-due-date-input").setAttribute("min", today);

document.addEventListener("click", (e) => {
  const button = e.target;
  if (button.matches(".new-project-btn")) {
    if (!newProjectInput.value) return;
    addProject();
    newProjectInput.value = "";
    saveProjectsToLocalStorage();
  }
  if (button.closest(".sidebar-nav-project")) {
    displayProjectTasks(e);
    header.textContent =
      button.closest(".sidebar-nav-project").querySelector(".nav-item-title")
        .textContent ?? "All Tasks";
  }
  if (button.closest(".add-task")) {
    mode = "add";
    formTaskButton.textContent = "Add Task";
    form.reset();
    modal.showModal();
    displayProjectOptions();
    console.log(projectsList);
    console.log(mode);
  }
  if (button.closest("#form-task-btn")) {
    if (mode === "add") {
      displayTask(addTask());
    } else if (mode === "update") {
      editTask();
    }
    saveProjectsToLocalStorage();
  }
  if (button.closest("#cancel-task-btn")) {
    modal.close();
  }
  if (button.closest(".trash-nav-icon")) {
    deleteProject(e);
    saveProjectsToLocalStorage();
    getAllTasks().forEach((task) => displayTask(task));
  }
  if (button.closest(".edit-btn")) {
    mode = "update";
    formTaskButton.textContent = "Edit Task";
    modal.showModal();
    console.log(mode);
    loadTaskValues(e);
  }
  if (button.closest(".delete-btn")) {
    deleteTask(e);
  }
  if (button.type === "checkbox") {
    toggleCheckbox(e);
  }
  if (button.closest(".today")) {
    filterTasks((task) => isEqual(task.dueDate, today));
  }
  if (button.closest(".upcoming")) {
    filterTasks((task) => isAfter(task.dueDate, today));
  }
  if (button.closest(".important")) {
    filterTasks((task) => task.priority === "high");
  }
  if (button.closest(".completed")) {
    filterTasks((task) => task.isComplete === true);
  }
});

newProjectInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && newProjectInput.value) {
    if (!newProjectInput.value) return;
    addProject();
    projectsList.forEach((project) => createProjectOption(project));
    newProjectInput.value = "";
    saveProjectsToLocalStorage();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  getAllTasks().forEach((task) => displayTask(task));
});
