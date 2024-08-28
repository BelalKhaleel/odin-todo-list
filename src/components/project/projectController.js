import Project from './projectModel';
import { displayProject } from './projectView';

const allTasks = Project('All Tasks');
let projectsList = JSON.parse(localStorage.getItem("projects")) || [allTasks];
localStorage.setItem("projects", JSON.stringify(projectsList));

const newProjectInput = document.querySelector('.new-project-input');

function addProject() {
  const newProject = Project(newProjectInput.value.trim());
  console.log(newProject);
  if (projectsList.some(project => project.title === newProject.title)) return;
  projectsList.push(newProject);
  console.log(projectsList)
  displayProject(newProject.title)
}

function deleteProject(e) {
  const project = e.target.closest('.sidebar-nav-project');
  const projectTitle = project.querySelector('.nav-item-title').textContent;
  const index = projectsList.findIndex(project => project.title === projectTitle);
  projectsList.splice(index, 1);
  project.remove();
}

export { addProject, allTasks, projectsList, newProjectInput, deleteProject };