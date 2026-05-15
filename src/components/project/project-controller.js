import Project from "./project-model";
import { displayProject } from "./project-view";
import TaskController from "../task/task-controller";

export default class ProjectController {
  static getAllProjects() {
    const projects = JSON.parse(localStorage.getItem("projects"));
    if (!projects) return;
    return projects;
  }
  static getProjectByTitle(title, projects) {
    if (typeof title !== "string")
      throw new Error("Project title must be a string.");
    if (!Array.isArray(projects))
      throw new Error("Projects must be an arrary.");
    const project = projects.find((project) => project.title === title);
    if (!project) return;
    return project;
  }
  static createProject(title) {
    if (typeof title !== "string")
      throw new Error("Project title must be a string.");
    title = title.trim();
    return new Project(title);
  }
  static deleteProject(title, projects) {
    const projectIndex = projects.findIndex(project => project.title === title);
    projects.splice(projectIndex, 1);
  }
  static tasksBelongToProject = (project, tasks) => {
    if (tasks.length === 0) return true;
    return tasks.every((task) => task.project === project.title);
  };
}
