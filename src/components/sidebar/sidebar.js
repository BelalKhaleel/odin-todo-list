import './sidebar.css';
import plusIcon from './plus-solid.svg';
import calendarDay from './calendar-day-solid.svg';
import calendarDays from './calendar-days-solid.svg';
import calendarCheck from './calendar-check-regular.svg';
import circleExclamation from './circle-exclamation-solid.svg';
import openFolder from './folder-open-solid.svg';
import trash from './trash-solid.svg';

const sidebar = document.createElement('div');
sidebar.classList.add('sidebar');

const sidebarHeader = document.createElement('h1');
sidebarHeader.classList.add('sidebar-header');
sidebarHeader.textContent = 'Task Manager';

const sidebarNavTasksDiv = document.createElement('div');
sidebarNavTasksDiv.classList.add('sidebar-nav-tasks');
const sidebarNavTasksDivHeader = document.createElement('h2');
sidebarNavTasksDivHeader.classList.add('tasks');
sidebarNavTasksDivHeader.textContent = 'Tasks';

const taskDivElemenets = [
  sidebarNavTasksDivHeader,
  createSidebarElement('Add task', 'sidebar-nav-item', 'add-task', plusIcon),
  createSidebarElement('Today', 'sidebar-nav-item', 'today', calendarDay),
  createSidebarElement('Upcoming', 'sidebar-nav-item', 'upcoming', calendarDays),
  createSidebarElement('Important', 'sidebar-nav-item', 'important', circleExclamation),
  createSidebarElement('Completed', 'sidebar-nav-item', 'completed', calendarCheck),
]

sidebarNavTasksDiv.append(...taskDivElemenets);

export const sidebarNavProjects = document.createElement('div');
sidebarNavProjects.classList.add('sidebar-nav-projects');
const sidebarNavProjectsHeader = document.createElement('h2');
sidebarNavProjectsHeader.classList.add('projects');
sidebarNavProjectsHeader.textContent = 'Projects';
sidebarNavProjects.appendChild(sidebarNavProjectsHeader);

const newProjectDiv = document.createElement('div');
newProjectDiv.classList.add('new-project-container');
const newProjectButton = document.createElement('img');
newProjectButton.classList.add('new-project-btn');
newProjectButton.src = plusIcon;
const newProjectInput = document.createElement('input');
newProjectInput.classList.add('new-project-input');
newProjectInput.required = true;
newProjectInput.placeholder = 'Add New Project';
newProjectDiv.append(newProjectInput, newProjectButton);
const myProject = createSidebarElement('My Project', 'sidebar-nav-project', 'my-project', openFolder);
const trashIcon = document.createElement('img');
trashIcon.classList.add('trash-nav-icon');
trashIcon.src = trash;
myProject.appendChild(trashIcon);

const projectDivElements = [
  sidebarNavProjectsHeader,
  newProjectDiv,
  myProject,
]
sidebarNavProjects.append(...projectDivElements);

sidebar.append(sidebarHeader, sidebarNavTasksDiv, sidebarNavProjects);

// const addProject = document.querySelector('#add-project');
// addProject.addEventListener('click', () => {
//   createSidebarElement(input.value, 'sidebar-nav-item', input.value.join('-').toLowerCase(), openFolder, sidebarNavProjects);
// })

export function createSidebarElement(title, itemClass, itemID, imgSrc) {
  const item = document.createElement('div');
  item.classList.add(itemClass);
  item.setAttribute('id', itemID);
  const itemTitle = document.createElement('span');
  itemTitle.classList.add('nav-item-title');
  itemTitle.textContent = title;
  const itemIcon = document.createElement('img');
  itemIcon.classList.add('nav-item-icon');
  itemIcon.src = imgSrc;
  item.append(itemIcon, itemTitle);
  return item;
}

// function createTitle(titleText, titleClass) {
//   const title = document.createElement('span');
//   title.classList.add(titleClass);
//   title.textContent = titleText;

//   return title;
// }

// function createIcon(imgSrc, iconClass) {
//   const icon = document.createElement('img');
//   icon.classList.add(iconClass);
//   icon.src = imgSrc;

//   return icon;
// }

export default sidebar;