import Project from "./project-model";
import { displayProject } from "./project-view";
// import { getAllTasks } from "../task/task-controller";
import TaskController from "../task/task-controller";

// const allTasks = new Project("All Tasks");
let projectsList = JSON.parse(localStorage.getItem("projects"));

// saveProjectsToLocalStorage();

// const newProjectInput = document.querySelector(".new-project-input");
export default class ProjectController {
  static getAllProjects() {
    const projects = JSON.parse(localStorage.getItem("projects"));
    if (!projects) return;
    return projects;
  }
  static getProjectByTitle(title, projects) {
    if (typeof title !== "string") throw new Error("Project title must be a string.");
    if (!Array.isArray(projects)) throw new Error("Projects must be an arrary.");
    const project = projects.find(project => project.title === title);
    if (!project) return;
    return project;
  }
  static createProject(title) {
    if (typeof title !== "string") throw new Error("Project title must be a string.");
    title = title.trim();
    return new Project(title);
  }
  static deleteProject(title, projects) {
    // const project = ProjectController.getProjectByTitle(title, projects);
    const projectIndex = projects.findIndex(project => project.title === title);
    projects.slice(projectIndex, 1);
  }
}

// function addProject() {
//   const newProject = new Project(newProjectInput.value.trim());
//   if (projectsList.some((project) => project.title === newProject.title))
//     return;
//   projectsList.push(newProject);
//   displayProject(newProject.title);
// }

function deleteProject(e) {
  const project = e.target.closest(".sidebar-nav-project");
  const projectTitle = project.querySelector(".nav-item-title").textContent;
  const index = projectsList.findIndex(
    (project) => project.title === projectTitle
  );
  if (index > -1) {
    const allTasks = TaskController.getAllTasks();

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

// function saveProjectsToLocalStorage() {
//   projectsList = ProjectController.getAllProjects();
//   console.log(projectsList)
//   localStorage.setItem("projects", JSON.stringify(projectsList));
// }

export {
  // addProject,
  // allTasks,
  projectsList,
  deleteProject,
};
