import Task from "./taskModel";
import edit from '../icons/pen-to-square-solid.svg';
import trash from '../icons/trash-can-regular.svg';
import { allTasks, projectsList } from "../project/projectController";

const title = document.getElementById('task-title-input');
const description = document.getElementById('task-description-input');
const dueDate = document.getElementById('task-due-date-input');
const priority = document.getElementById('task-priority-input');
const project = document.getElementById('task-project');

function addTask() {
  const task = Task(title.value.trim(), description.value.trim(), dueDate.value, priority.value, project.options[project.selectedIndex].textContent);
  allTasks.tasksList.push(task);
  const index = projectsList.findIndex(p => p.title === project.options[project.selectedIndex].textContent);
  if (index > -1) projectsList[index].tasksList.push(task);
  displayTask(task);
}

const taskCards = document.querySelector('.task-cards');

function displayTask(task) {
const taskCard = document.createElement('div');
taskCard.className = 'task-card';

const priority = document.createElement('div');
priority.className = 'priority';
if (task.priority === 'high') {
  priority.style.backgroundColor = 'red';
} else if (task.priority === 'low') {
  priority.style.backgroundColor = 'green';
} else {
  priority.style.backgroundColor = 'yellow';
}

const mainContent = document.createElement('div');
mainContent.className = 'main-content';

const upperSection = document.createElement('div');
upperSection.className = 'upper-section';

const round = document.createElement('div');
round.className = 'round';

const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.checked = false;
checkbox.id = 'checkbox';

const label = document.createElement('label');
label.setAttribute('for', 'checkbox');

round.append(checkbox, label);

const title = document.createElement('h3');
title.className = 'task-title';
title.textContent = task.title;

upperSection.append(round, title);

const description = document.createElement('p');
description.className = 'task-description';
description.textContent = task.description;

const dueDate = document.createElement('span');
dueDate.className = 'due-date';
dueDate.textContent = task.dueDate;

mainContent.append(upperSection, description, dueDate);

const rightSection = document.createElement('div');
rightSection.className = 'right-section';

taskCard.append(priority, mainContent, rightSection);

const cardActions = document.createElement('div');
cardActions.className = 'card-actions';

const editIcon = document.createElement('img');
editIcon.src = edit;
editIcon.alt = 'edit-icon';
editIcon.className = 'task-card-icon';

const trashIcon = document.createElement('img');
trashIcon.src = trash;
trashIcon.alt = 'trash-icon';
trashIcon.className = 'task-card-icon';
cardActions.append(editIcon, trashIcon);

const projectName = document.createElement('span');
projectName.className = 'project-name';
projectName.textContent = task.project;
rightSection.append(cardActions, projectName);

taskCards.appendChild(taskCard);
}

export { addTask };