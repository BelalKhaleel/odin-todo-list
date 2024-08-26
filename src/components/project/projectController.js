import Project from './projectModel';
import openFolder from '../icons/folder-open-solid.svg';
import trash from '../icons/trash-solid.svg';

const sidebarNavProjects = document.querySelector('.sidebar-nav-projects');
const allTasks = Project('All Tasks');
const projectsList = [allTasks];
// console.log(Project('Todo List'));
function displayProject(title) {
  const project = document.createElement('div');
  project.classList.add('sidebar-nav-project');
  // project.setAttribute('id', id);
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
  // if (newProjectInput.value.includes(' ')) {
  //   displayProject(trim(newProjectInput.value), trim(newProjectInput.value).split(' ').join('-').toLowerCase());
  // } else {
  //   displayProject(trim(newProjectInput.value), trim(newProjectInput.value).toLowerCase());
  // }
}

const projectOptions = document.querySelector('#task-project');

function createProjectOption(project) {
  const option = document.createElement('option');
  let optionValue = '';
  optionValue = project.title.includes(' ') ? project.title.split(' ').join('-').toLowerCase() : project.title.toLowerCase();
  option.setAttribute('value', optionValue);
  option.textContent = project.title;
  projectOptions.appendChild(option);
  return option;
}

export { addProject, allTasks, projectsList, newProjectInput, createProjectOption };