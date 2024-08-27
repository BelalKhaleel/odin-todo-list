import Project from './projectModel';
import openFolder from '../icons/folder-open-solid.svg';
import trash from '../icons/trash-solid.svg';

const sidebarNavProjects = document.querySelector('.sidebar-nav-projects');
const allTasks = Project('All Tasks');
const projectsList = [allTasks];

function displayProject(title) {
  const project = document.createElement('div');
  project.classList.add('sidebar-nav-project');
  const projectTitle = document.createElement('span');
  projectTitle.classList.add('nav-item-title');
  projectTitle.textContent = title;
  const openFolderIcon = document.createElement('img');
  openFolderIcon.classList.add('nav-item-icon');
  openFolderIcon.src = openFolder;
  const trashIcon = document.createElement('img');
  trashIcon.classList.add('trash-nav-icon');
  trashIcon.src = trash;
  project.append(openFolderIcon, projectTitle, trashIcon);
  sidebarNavProjects.appendChild(project);
  return project;
}

const newProjectInput = document.querySelector('.new-project-input');

function addProject() {
  if (!newProjectInput.value) return;
  const newProject = Project(newProjectInput.value.trim());
  console.log(newProject);
  projectsList.push(newProject);
  console.log(projectsList)
  displayProject(newProject.title);
}

const projectOptions = document.querySelector('#task-project');

function createProjectOption(project) {
  const option = document.createElement('option');
  const optionValue = project.title.toLowerCase().replace(/\s+/g, '-');
  option.setAttribute('value', optionValue);
  option.textContent = project.title;
  // option.dataset.projectIndex = projectsList.indexOf(project);
  projectOptions.appendChild(option);
  return option;
}

function deleteProject(e) {
  const project = e.target.closest('.sidebar-nav-project');
  const projectTitle = project.querySelector('.nav-item-title').textContent;
  const index = projectsList.findIndex(project => project.title === projectTitle);
  projectsList.splice(index, 1);
  project.remove();
}

export { addProject, allTasks, projectsList, newProjectInput, createProjectOption, deleteProject };