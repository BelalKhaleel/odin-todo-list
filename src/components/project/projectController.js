import Project from "./projectModel";
import { displayProject } from "./projectView";
import { getAllTasks } from "../task/taskController";

const allTasks = Project("All Tasks");
let projectsList = JSON.parse(localStorage.getItem("projects")) || [allTasks];
saveProjectsToLocalStorage();

const newProjectInput = document.querySelector(".new-project-input");

function addProject() {
  const newProject = Project(newProjectInput.value.trim());
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
    const allTasks = getAllTasks();

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
  localStorage.setItem("projects", JSON.stringify(projectsList));
}

export {
  addProject,
  allTasks,
  projectsList,
  newProjectInput,
  saveProjectsToLocalStorage,
  deleteProject,
};
