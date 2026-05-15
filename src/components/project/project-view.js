import openFolder from "../icons/folder-open-solid.svg";
import trash from "../icons/trash-solid.svg";
import ProjectController, { projectsList } from "./project-controller";
import TaskView from "../task/task-view";
import TaskController from "../task/task-controller";

export default class ProjectView {
  static projectOptions = document.querySelector("#task-project");

  static displayProject(project) {
    const projectContainer = document.createElement("li");
    const projectBtn = document.createElement("button");
    projectBtn.classList.add(
      "sidebar-nav-item",
      "open-folder",
      "sidebar-nav-project",
    );
    projectBtn.textContent = project.title;
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
  static displayProjectTasks(title) {
    const projects = ProjectController.getAllProjects();
    const index = projects.findIndex((project) => project.title === title);
    TaskView.clearTaskCards();
    const tasks = JSON.parse(localStorage.getItem("projects"))[index].tasksList;
    tasks.forEach((task) => TaskView.displayTask(task));
  }
  static createProjectOption(project) {
    if (!project) return;
    const option = document.createElement("option");
    option.classList.add("project-option");
    option.setAttribute(
      "value",
      project.title.toLowerCase().replace(/\s+/g, "-"),
    );
    option.textContent = project.title;
    this.projectOptions.appendChild(option);
    return option;
  }
  static displayProjectOptions(options) {
    options.forEach((option) => option.remove());
    const projects = ProjectController.getAllProjects();
    if (projects.length === 0) return;
    projects.forEach((project) => this.createProjectOption(project));
  }
  static removeProject(e) {
    const item = e.target.closest("li");
    const projectTitle = item.querySelector(".sidebar-nav-project").textContent;
    const projects = ProjectController.getAllProjects();
    ProjectController.deleteProject(projectTitle, projects);
    localStorage.setItem("projects", JSON.stringify(projects));
    item.remove();
    const tasks = TaskController.getAllTasks();
    const filteredTasks = tasks.filter(
      (task) => task.project !== projectTitle,
    );
    localStorage.setItem("all tasks", JSON.stringify(filteredTasks));
    TaskView.displayTasks(TaskController.getAllTasks());
  }
}

