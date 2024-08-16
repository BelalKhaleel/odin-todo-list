import openFolder from './folder-open-solid.svg';
import trash from './trash-solid.svg';

const sidebarNavProjects = document.querySelector('.sidebar-nav-projects');

export function createSidebarProject(title, itemID) {
  const project = document.createElement('div');
  project.classList.add('sidebar-nav-project');
  project.setAttribute('id', itemID);
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
