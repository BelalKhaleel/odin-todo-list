import Project from "./project-model";
import { displayProject } from "./project-view";
// import { getAllTasks } from "../task/task-controller";
import TaskController from "../task/task-controller";

// const allTasks = new Project("All Tasks");
let projectsList = JSON.parse(localStorage.getItem("projects"));

saveProjectsToLocalStorage();

const newProjectInput = document.querySelector(".new-project-input");

function getAllProjects() {
  return JSON.parse(localStorage.getItem("projects"));
}

function addProject() {
  const newProject = new Project(newProjectInput.value.trim());
  if (projectsList.some((project) => project.title === newProject.title))
    return;
  projectsList.push(newProject);
  displayProject(newProject.title);
}

function deleteProject(e) {
  const project = e.target.closest(".sidebar-nav-project");
  const projectTitle = project.querySelector(".nav-item-title").textContent;
  const index = projectsList.findIndex(
    (project) => project.title === projectTitle
  );
  if (index > -1) {
    const allTasks = TaskController.getAllTasks;

    projectsList[index].tasksList.forEach((task) => {
      const taskIndexInAllTasks = allTasks.findIndex((t) => t.id === task.id);
      if (taskIndexInAllTasks > -1) {
        allTasks.splice(taskIndexInAllTasks, 1);
      }
    });
  }

  document.querySelectorAll(".task-card").forEach((card) => {
    if (card.querySelector(".project-name").textContent === projectTitle) {
      card.remove();
    }
  });

  projectsList.splice(index, 1);
  project.remove();
}

function saveProjectsToLocalStorage() {
  projectsList = getAllProjects();
  console.log(projectsList)
  localStorage.setItem("projects", JSON.stringify(projectsList));
}

export {
  addProject,
  // allTasks,
  projectsList,
  newProjectInput,
  saveProjectsToLocalStorage,
  deleteProject,
};
