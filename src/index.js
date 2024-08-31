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
  clearTaskCards,
  displayTask,
  loadTaskValues,
  toggleCheckbox,
} from "./components/task/taskView.js";
import { format, isEqual, isAfter } from "date-fns";
import "./style.css";

const header = document.querySelector('.current-project');
const modal = document.querySelector("dialog");
const form = document.getElementById("task-form");
let mode = "add";
const formTaskButton = document.getElementById("form-task-btn");
const today = format(new Date(), "yyyy-MM-dd");

document.addEventListener("click", (e) => {
  if (e.target.matches(".new-project-btn")) {
    if (!newProjectInput.value) return;
    addProject();
    newProjectInput.value = "";
    saveProjectsToLocalStorage();
  }
  if (e.target.closest(".sidebar-nav-project")) {
    displayProjectTasks(e);
    header.textContent = e.target.closest('.sidebar-nav-project').querySelector('.nav-item-title').textContent ?? 'All Tasks';
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
    getAllTasks().forEach((task) => displayTask(task));
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
  if (e.target.type === "checkbox") {
    toggleCheckbox(e);
  }
  if (e.target.closest("#today")) {
    filterTasks((task) => isEqual(task.dueDate, today));
  }
  if (e.target.closest("#upcoming")) {
    filterTasks((task) => isAfter(task.dueDate, today))
  }
  if (e.target.closest("#important")) {
    filterTasks((task) => task.priority === "high");
  }
  if (e.target.closest('#completed')) {
    filterTasks((task) =>  task.isComplete === true);
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
