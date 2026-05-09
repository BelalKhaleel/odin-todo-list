import {
  deleteProject,
  projectsList,
  // saveProjectsToLocalStorage,
} from "./components/project/project-controller.js";
import ProjectController from "./components/project/project-controller.js";
import ProjectView, {
  createProjectOption,
  displayProjectOptions,
  displayProjects,
  displayProjectTasks,
} from "./components/project/project-view.js";
import TaskController from "./components/task/task-controller.js";
import {
  deleteTask,
  editTask,
  filterTasks,
} from "./components/task/task-controller.js";
import TaskView, {
  loadTaskValues,
  toggleCheckbox,
} from "./components/task/task-view.js";
import { format, isEqual, isAfter } from "date-fns";
import "./style.css";
import Project from "./components/project/project-model.js";

const header = document.querySelector(".current-project");
const sidebarAddTaskButton = document.querySelector(".add-task");
const todayTasks = document.querySelector(".today");
const upcomingTasks = document.querySelector(".upcoming");
const importantTasks = document.querySelector(".important");
const completedTasks = document.querySelector(".completed");
const newProjectInput = document.querySelector(".new-project-input");
const newProjectButton = document.querySelector(".new-project-btn");
const modal = document.querySelector("dialog");
const form = document.querySelector("form");
const allTasksProject = document.querySelector(".all-tasks-option");
const formTaskButton = document.getElementById("form-task-btn");
const formCloseButton = document.querySelector("#cancel-task-btn");
const today = format(new Date(), "yyyy-MM-dd");
let mode = "add";
document.getElementById("task-due-date-input").setAttribute("min", today);

sidebarAddTaskButton.addEventListener("click", () => {
  mode = "add";
  formTaskButton.textContent = "Add Task";
  modal.showModal();
  form.reset();
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
  const projectTitle = newProjectInput.value.trim();
  const projects = ProjectController.getAllProjects();
  const projectAlreadyExists = ProjectController.getProject(projectTitle, projects);
  if (projectAlreadyExists) return;
  const project = ProjectController.createProject(projectTitle);
  projects.push(project);
  localStorage.setItem("projects", JSON.stringify(projects));
  newProjectInput.value = "";
  ProjectView.displayProject(project);
  // saveProjectsToLocalStorage();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const trimmedData = JSON.parse(
      JSON.stringify(data, (key, value) =>
        typeof value === "string" ? value.trim() : value,
      ),
    );
    // console.log("Full Form Data:", trimmedData);
    if (mode === "add") {
      const task = TaskController.createTask(trimmedData);
      console.log(task)
      const allTasks = TaskController.getAllTasks();
      allTasks.push(task);
      console.log(allTasks);
      localStorage.setItem("all tasks", JSON.stringify(allTasks));
      TaskView.displayAllTasks(allTasks);
      if (task.project === "all-projects") return;
      const projects = ProjectController.getAllProjects();
      const projectIndex = projects.findIndex(project => project.title === task.project);
      projects[projectIndex].tasksList.push(task);
      localStorage.setItem('projects', JSON.stringify(projects));
    }
    form.reset();
});

formCloseButton.addEventListener("click", () => modal.close());

document.addEventListener("click", (e) => {
  const button = e.target;

  if (button.closest(".sidebar-nav-project")) {
    const projectTitle = button.textContent;
    ProjectView.displayProjectTasks(projectTitle);
  }
  if (button.closest(".trash-nav-icon")) {
    deleteProject(e);
    // saveProjectsToLocalStorage();
    TaskController.getAllTasks().forEach((task) => TaskView.displayTask(task));
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
  if (e.key !== "Enter") return;
  if (!newProjectInput.value) return;
  const projectTitle = newProjectInput.value.trim();
  ProjectController.addProject(projectTitle);
  projectsList.forEach((project) => createProjectOption(project));
  newProjectInput.value = "";
  // saveProjectsToLocalStorage();
});

document.addEventListener("DOMContentLoaded", () => {
  let allTasks = JSON.parse(localStorage.getItem("all tasks"));
  if (!allTasks) {
    localStorage.setItem("all tasks", JSON.stringify([]));
    allTasks = JSON.parse(localStorage.getItem("all tasks"));
  }
  const projects = JSON.parse(localStorage.getItem("projects"));
  if (!projects) {
    localStorage.setItem("projects", JSON.stringify([]));
  }
  // displayProjects(projects);
  // const allTasks = TaskController.getAllTasks()
  // if (!allTasks) return;
  TaskView.displayAllTasks(allTasks);
  ProjectView.displayProjects(projects);
});
