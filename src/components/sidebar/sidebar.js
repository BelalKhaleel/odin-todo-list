import './sidebar.css';
import plusIcon from './plus-solid.svg';
import calendarDay from './calendar-day-solid.svg';
import calendarDays from './calendar-days-solid.svg';
import calendarCheck from './calendar-check-regular.svg';
import circleExclamation from './circle-exclamation-solid.svg';
import openFolder from './folder-open-solid.svg';

const sidebar = document.createElement('div');
sidebar.classList.add('sidebar');

const sidebarHeader = document.createElement('h1');
sidebarHeader.classList.add('sidebar-header');
sidebarHeader.textContent = 'Task Manager';

const sideBarNavTasks = document.createElement('div');
sideBarNavTasks.classList.add('sidebar-nav-tasks');
const sideBarNavTasksHeader = document.createElement('h2');
sideBarNavTasksHeader.classList.add('tasks');
sideBarNavTasksHeader.textContent = 'Tasks';
sideBarNavTasks.appendChild(sideBarNavTasksHeader);
addItemToSidebar('Add task', 'sidebar-nav-item', 'add-task', plusIcon, sideBarNavTasks);
addItemToSidebar('Today', 'sidebar-nav-item', 'today', calendarDay, sideBarNavTasks);
addItemToSidebar('Upcoming', 'sidebar-nav-item', 'upcoming', calendarDays, sideBarNavTasks);
addItemToSidebar('Important', 'sidebar-nav-item', 'important', circleExclamation, sideBarNavTasks);
addItemToSidebar('Completed', 'sidebar-nav-item', 'completed', calendarCheck, sideBarNavTasks);

const sideBarNavProjects = document.createElement('div');
sideBarNavProjects.classList.add('sidebar-nav-projects');
const sideBarNavProjectsHeader = document.createElement('h2');
sideBarNavProjectsHeader.classList.add('projects');
sideBarNavProjectsHeader.textContent = 'Projects';
sideBarNavProjects.appendChild(sideBarNavProjectsHeader);
addItemToSidebar('Add project', 'sidebar-nav-item', 'add-project', plusIcon, sideBarNavProjects);
addItemToSidebar('My Project', 'sidebar-nav-item', 'my-project', openFolder, sideBarNavProjects);

sidebar.append(sidebarHeader, sideBarNavTasks, sideBarNavProjects);

function addItemToSidebar(title, itemClass, itemID, imgSrc, parent) {
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
  parent.append(item);
}

export default sidebar;