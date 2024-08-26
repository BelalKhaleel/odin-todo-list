import Task from "./taskModel";
import edit from '../icons/pen-to-square-solid.svg';
import trash from '../icons/trash-can-regular.svg';
import { allTasks } from "../project/projectController";

const title = document.getElementById('task-title-input');
const description = document.getElementById('task-description-input');
const dueDate = document.getElementById('task-due-date-input');
const priority = document.getElementById('task-priority-input');
const project = document.getElementById('task-project');

function addTask() {
  const task = Task(title.value, description.value, dueDate.value, priority.value, project.value);
  allTasks.push(task);
  displayTask(task);
}

const taskCards = document.querySelector('.task-cards');

function displayTask() {
const taskCard = document.createElement('div');
taskCard.className = 'task-card';

const priority = document.createElement('div');
priority.className = 'priority';
priority.style.backgroundColor = 'red';

const mainContent = document.createElement('div');
mainContent.className = 'main-content';

const upperSection = document.createElement('div');
upperSection.className = 'upper-section';

const round = document.createElement('div');
round.className = 'round';

const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.checked = true;
checkbox.id = 'checkbox';

const label = document.createElement('label');
label.setAttribute('for', 'checkbox');

round.append(checkbox, label);

const title = document.createElement('h3');
title.className = 'task-title';
title.textContent = 'Create todo project';

upperSection.append(round, title);

const description = document.createElement('p');
description.className = 'task-description';
description.textContent = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque mollitia at aliquam, tempore quas dicta, repudiandae quibusdam soluta quisquam maxime ea minus quis non explicabo ducimus praesentium incidunt tempora sapiente?';

const dueDate = document.createElement('span');
dueDate.className = 'due-date';
dueDate.textContent = '1-1-1995';

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
projectName.textContent = 'My Project';
rightSection.append(cardActions, projectName);

taskCards.appendChild(taskCard);
}

displayTask()

export { displayTask };