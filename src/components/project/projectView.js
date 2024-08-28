import openFolder from '../icons/folder-open-solid.svg';
import trash from '../icons/trash-solid.svg';
import { projectsList } from './projectController';

const sidebarNavProjects = document.querySelector('.sidebar-nav-projects');

function displayProject(title) {
  if (title !== 'All Tasks') {
    const project = document.createElement('button');
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
    // return project;
  }
}

function loadProjects() {
  projectsList.forEach(project => displayProject(project.title));
}

const projectOptions = document.querySelector('#task-project');

function createProjectOption(project) {
  const option = document.createElement('option');
  option.classList.add('project-option');
  const optionValue = project.title.toLowerCase().replace(/\s+/g, '-');
  option.setAttribute('value', optionValue);
  option.textContent = project.title;
  // option.dataset.projectIndex = projectsList.indexOf(project);
  projectOptions.appendChild(option);
  return option;
}

function displayProjectOptions() {
  const options = document.querySelectorAll('.project-option');
  options.forEach(option => option.remove());
  projectsList.forEach(project => createProjectOption(project));
}

export { displayProject, loadProjects, projectOptions, createProjectOption, displayProjectOptions };