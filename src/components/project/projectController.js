import openFolder from '../icons/folder-open-solid.svg';
import trash from '../icons/trash-solid.svg';

const sidebarNavProjects = document.querySelector('.sidebar-nav-projects');

function displayProject(title, id) {
  const project = document.createElement('div');
  project.classList.add('sidebar-nav-project');
  project.setAttribute('id', id);
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

export const addProject = () => {
  if (!newProjectInput.value) return;
  if (newProjectInput.value.includes(' ')) {
    displayProject(trim(newProjectInput.value), trim(newProjectInput.value).split(' ').join('-').toLowerCase());
  } else {
    displayProject(trim(newProjectInput.value), trim(newProjectInput.value).toLowerCase());
  }
}

