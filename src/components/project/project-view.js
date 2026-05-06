import openFolder from "../icons/folder-open-solid.svg";
import trash from "../icons/trash-solid.svg";
import { projectsList } from "./project-controller";
import TaskView from "../task/task-view";

export default class ProjectView {
  static displayProject(project) {
    const projectContainer = document.createElement("li");
    const projectBtn = document.createElement("button");
    projectBtn.classList.add(
      "sidebar-nav-item",
      "open-folder",
      "sidebar-nav-project",
    );
    projectBtn.textContent = project.title;
    // const openFolderIcon = document.createElement("img");
    // openFolderIcon.classList.add("nav-item-icon");
    // openFolderIcon.src = openFolder;
    const trashIconContainer = document.createElement("button");
    const trashIcon = document.createElement("img");
    trashIcon.classList.add("trash-nav-icon");
    trashIcon.src = trash;
    trashIcon.style.width = "20px";
    trashIconContainer.append(trashIcon);
    projectContainer.append(projectBtn, trashIconContainer);
    document
      .querySelector(".sidebar-nav-projects ul")
      .appendChild(projectContainer);
  }
  static displayProjects(projects) {
    if (!projects) return;
    projects.forEach((project) => this.displayProject(project));
  }
}

// function displayProject(title) {
//   if (title === "All Tasks") return;
//     const project = document.createElement("button");
//     project.classList.add("sidebar-nav-item", "open-folder", "sidebar-nav-project");
//     project.textContent = title;
//     // const openFolderIcon = document.createElement("img");
//     // openFolderIcon.classList.add("nav-item-icon");
//     // openFolderIcon.src = openFolder;
//     const trashIcon = document.createElement("img");
//     trashIcon.classList.add("trash-nav-icon");
//     trashIcon.src = trash;
//     project.append(trashIcon);
//     document.querySelector(".sidebar-nav-projects").appendChild(project);
// }

function displayProjects(projects) {
  if (!projects) return;
  projects.forEach((project) => displayProject(project.title));
}

const projectOptions = document.querySelector("#task-project");

function createProjectOption(project) {
  if (!project) return;
  const option = document.createElement("option");
  option.classList.add("project-option");
  option.setAttribute("value", project.title.toLowerCase().replace(/\s+/g, "-"));
  option.textContent = project.title;
  projectOptions.appendChild(option);
  return option;
}

function displayProjectOptions() {
  document.querySelectorAll(".project-option").forEach((option) => option.remove());
  if(!projectsList) return;
  projectsList.forEach((project) => createProjectOption(project));
}

function displayProjectTasks(e) {
  const index = projectsList.findIndex(
    (project) => project.title === e.target.closest(".sidebar-nav-project").querySelector(".nav-item-title").textContent
  );
  TaskView.clearTaskCards();
  const tasks = JSON.parse(localStorage.getItem("projects"))[index].tasksList;
  tasks.forEach((task) => TaskView.displayTask(task));
}

export {
  // displayProject,
  displayProjects,
  projectOptions,
  createProjectOption,
  displayProjectOptions,
  displayProjectTasks,
};
