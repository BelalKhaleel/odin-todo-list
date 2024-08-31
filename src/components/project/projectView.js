import openFolder from "../icons/folder-open-solid.svg";
import trash from "../icons/trash-solid.svg";
import { projectsList } from "./projectController";
import { clearTaskCards, displayTask } from "../task/taskView";

function displayProject(title) {
  if (title !== "All Tasks") {
    const project = document.createElement("button");
    project.classList.add("sidebar-nav-project");
    const projectTitle = document.createElement("span");
    projectTitle.classList.add("nav-item-title");
    projectTitle.textContent = title;
    const openFolderIcon = document.createElement("img");
    openFolderIcon.classList.add("nav-item-icon");
    openFolderIcon.src = openFolder;
    const trashIcon = document.createElement("img");
    trashIcon.classList.add("trash-nav-icon");
    trashIcon.src = trash;
    project.append(openFolderIcon, projectTitle, trashIcon);
    document.querySelector(".sidebar-nav-projects").appendChild(project);
  }
}

function loadProjects() {
  projectsList.forEach((project) => displayProject(project.title));
}

const projectOptions = document.querySelector("#task-project");

function createProjectOption(project) {
  if (project) {
    const option = document.createElement("option");
    option.classList.add("project-option");
    option.setAttribute("value", project.title.toLowerCase().replace(/\s+/g, "-"));
    option.textContent = project.title;
    projectOptions.appendChild(option);
    return option;
  }
}

function displayProjectOptions() {
  document.querySelectorAll(".project-option").forEach((option) => option.remove());
  projectsList.forEach((project) => createProjectOption(project));
}

function displayProjectTasks(e) {
  const index = projectsList.findIndex(
    (project) => project.title === e.target.closest(".sidebar-nav-project").querySelector(".nav-item-title").textContent
  );
  clearTaskCards();
  const tasks = JSON.parse(localStorage.getItem("projects"))[index].tasksList;
  tasks.forEach((task) => displayTask(task));
}

export {
  displayProject,
  loadProjects,
  projectOptions,
  createProjectOption,
  displayProjectOptions,
  displayProjectTasks,
};
