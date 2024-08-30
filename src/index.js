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
} from "./components/task/taskController.js";
import {
  clearTaskCards,
  displayTask,
  loadTaskValues,
} from "./components/task/taskView.js";
import { format, isEqual, isAfter } from "date-fns";
import "./style.css";

const modal = document.querySelector("dialog");
const form = document.getElementById("task-form");
let mode = "add";
const formTaskButton = document.getElementById("form-task-btn");

console.log(formTaskButton);
document.addEventListener("click", (e) => {
  if (e.target.matches(".new-project-btn")) {
    if (!newProjectInput.value) return;
    addProject();
    newProjectInput.value = "";
    saveProjectsToLocalStorage();
  }
  if (e.target.closest(".sidebar-nav-project")) {
    displayProjectTasks(e);
  }
  if (e.target.closest("#nav-add-task")) {
    mode = "add";
    formTaskButton.textContent = "Add Task";
    form.reset();
    modal.showModal();
    displayProjectOptions();
    console.log(projectsList);
    console.log(mode);
  }
  if (e.target.closest("#form-task-btn")) {
    if (mode === "add") {
      displayTask(addTask());
    } else if (mode === "update") {
      editTask();
    }
    saveProjectsToLocalStorage();
  }
  if (e.target.closest("#cancel-task-btn")) {
    modal.close();
  }
  if (e.target.closest(".trash-nav-icon")) {
    deleteProject(e);
    saveProjectsToLocalStorage();
  }
  if (e.target.closest(".edit-btn")) {
    mode = "update";
    formTaskButton.textContent = "Edit Task";
    modal.showModal();
    console.log(mode);
    loadTaskValues(e);
  }
  if (e.target.closest(".delete-btn")) {
    deleteTask(e);
  }
  if (e.target.closest("#today")) {
    const today = format(new Date(), "yyyy-MM-dd");
    clearTaskCards();
    getAllTasks()
      .filter((task) => isEqual(task.dueDate, today))
      .forEach((task) => displayTask(task));
  }
  if (e.target.closest("#upcoming")) {
    const today = format(new Date(), "yyyy-MM-dd");
    clearTaskCards();
    getAllTasks()
      .filter((task) => isAfter(task.dueDate, today))
      .forEach((task) => displayTask(task));
  }
  if (e.target.closest("#important")) {
    clearTaskCards();
    getAllTasks()
      .filter((task) => task.priority === "high")
      .forEach((task) => displayTask(task));
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
  console.log(projectsList);
  const allTasks = getAllTasks();
  allTasks.forEach((task) => displayTask(task));
});
