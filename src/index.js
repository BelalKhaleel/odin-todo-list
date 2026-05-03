import {
  addProject,
  deleteProject,
  newProjectInput,
  projectsList,
  saveProjectsToLocalStorage,
} from "./components/project/project-controller.js";
import {
  createProjectOption,
  displayProjectOptions,
  loadProjects,
  displayProjectTasks,
} from "./components/project/project-view.js";
import TaskController from "./components/task/task-controller.js";
import {
  deleteTask,
  editTask,
  filterTasks,
} from "./components/task/task-controller.js";
import {
  displayTask,
  loadTaskValues,
  toggleCheckbox,
} from "./components/task/task-view.js";
import { format, isEqual, isAfter } from "date-fns";
import "./style.css";

const header = document.querySelector(".current-project");
const sidebarAddTaskButton = document.querySelector(".add-task");
const todayTasks = document.querySelector(".today");
const upcomingTasks = document.querySelector(".upcoming");
const importantTasks = document.querySelector(".important");
const completedTasks = document.querySelector(".completed");
const newProjectButton = document.querySelector(".new-project-btn");
const modal = document.querySelector("dialog");
const form = document.querySelector("form");
const formTaskButton = document.getElementById("form-task-btn");
const formCancelButton = document.querySelector("#cancel-task-btn");
const today = format(new Date(), "yyyy-MM-dd");
let mode = "add";
document.getElementById("task-due-date-input").setAttribute("min", today);

sidebarAddTaskButton.addEventListener("click", () => {
  mode = "add";
  formTaskButton.textContent = "Add Task";
  form.reset();
  modal.showModal();
  displayProjectOptions();
  console.log(projectsList);
  console.log(mode);
});

todayTasks.addEventListener("click", () => filterTasks((task) => isEqual(task.dueDate, today)));

upcomingTasks.addEventListener("click", () => filterTasks((task) => isAfter(task.dueDate, today)));

importantTasks.addEventListener("click", () => filterTasks((task) => task.priority === "high"));

completedTasks.addEventListener("click", () => filterTasks((task) => task.isComplete === true));

newProjectButton.addEventListener("click", () => {
  if (!newProjectInput.value) return;
  addProject();
  newProjectInput.value = "";
  saveProjectsToLocalStorage();
});

formTaskButton.addEventListener("click", () => {
  const title = document.getElementById("task-title-input").value.trim();
  const description = document
    .getElementById("task-description-input")
    .value.trim();
  const dueDate = document.getElementById("task-due-date-input").value;
  const priority = document.getElementById("task-priority-input").value;
  const projectIndex = document.getElementById("task-project").options.selectedIndex;
  const project =
    document.getElementById("task-project").options[projectIndex].textContent;
  if (mode === "add") {
    const task = TaskController.addTask(
      title,
      description,
      dueDate,
      priority,
      project,
    );
    const index = projectsList.findIndex((p) => p.title === project);
    // to add a task to a project other than the 'All Tasks' array
    if (index > 0) projectsList[index].tasksList.push(task);

    const allTasks = TaskController.getAllTasks();
    const isTaskInAllTasks = allTasks.some(
      (t) =>
        t.title === task.title &&
        t.description === task.description &&
        t.dueDate === task.dueDate,
    );

    if (!isTaskInAllTasks) {
      projectsList[0].tasksList.push(task);
    }
    displayTask(task);
  } else if (mode === "update") {
    editTask();
  }
  // saveProjectsToLocalStorage();
})

formCancelButton.addEventListener("click", () => modal.close());

document.addEventListener("click", (e) => {
  const button = e.target;

  if (button.closest(".sidebar-nav-project")) {
    displayProjectTasks(e);
    header.textContent =
      button.closest(".sidebar-nav-project").querySelector(".nav-item-title")
        .textContent ?? "All Tasks";
  }
  if (button.closest(".trash-nav-icon")) {
    deleteProject(e);
    saveProjectsToLocalStorage();
    TaskController.getAllTasks().forEach((task) => displayTask(task));
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
  const allTasks = TaskController.getAllTasks()
  if (!allTasks) return;
  allTasks.forEach((task) =>
    displayTask(task),
  );
});
