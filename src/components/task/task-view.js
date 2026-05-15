import { isPlainObject } from "../../middleware";
import ProjectController from "../project/project-controller";
import TaskController from "./task-controller";
import Task from "./task-model";

export default class TaskView {
  static displayTask(task) {
    const taskCard = document.createElement("div");
    taskCard.className = "task-card";

    if (task.priority === "high") {
      taskCard.classList.add("high-priority");
    } else if (task.priority === "low") {
      taskCard.classList.add("low-priority");
    } else {
      taskCard.classList.add("medium-priority");
    }

    const mainContent = document.createElement("div");
    mainContent.className = "main-content";

    const upperSection = document.createElement("div");
    upperSection.className = "upper-section";

    const roundedCheckbox = document.createElement("div");
    roundedCheckbox.className = "rounded-checkbox";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.isComplete;
    checkbox.id = `checkbox-${task.id}`;

    const label = document.createElement("label");
    label.setAttribute("for", `checkbox-${task.id}`);

    roundedCheckbox.append(checkbox, label);

    const title = document.createElement("h3");
    title.className = "task-title";
    title.textContent = task.title;

    upperSection.append(roundedCheckbox, title);

    const description = document.createElement("p");
    description.className = "task-description";
    description.textContent = task.description;

    const dueDate = document.createElement("span");
    dueDate.className = "due-date";
    dueDate.textContent = task.dueDate;

    if (task.isComplete) {
      title.classList.add("strikethrough");
      description.classList.add("strikethrough");
      dueDate.classList.add("strikethrough");
    }

    mainContent.append(upperSection, description, dueDate);

    const rightSection = document.createElement("div");
    rightSection.className = "right-section";

    taskCard.append(mainContent, rightSection);

    const cardActions = document.createElement("div");
    cardActions.className = "card-actions";

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25px">
    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
  </svg>`;
    editBtn.classList.add("task-card-icon");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="23px">
    <path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
  </svg>`;
    deleteBtn.classList.add("task-card-icon");
    cardActions.append(editBtn, deleteBtn);

    const projectName = document.createElement("span");
    projectName.className = "project-name";
    projectName.textContent = task.project;
    rightSection.append(cardActions, projectName);
    taskCard.dataset.taskId = task.id;

    document.querySelector(".tasks-container").appendChild(taskCard);
  }
  static displayTasks(tasks) {
    if (!Array.isArray(tasks))
      throw new Error("Argument should be an array of tasks.");
    if (tasks.length === 0) return;
    this.clearTaskCards();
    tasks.forEach((task) => this.displayTask(task));
  }
  static displayCurrentTaskDetails(task) {
    if (!isPlainObject)
      throw new Error("Task details must be contained in an object.");
    const title = document.getElementById("task-title-input");
    const description = document.getElementById("task-description-input");
    const dueDate = document.getElementById("task-due-date-input");
    const priority = document.getElementById("task-priority-input");
    const project = document.getElementById("task-project");
    title.value = task.title;
    description.value = task.description;
    dueDate.value = task.dueDate;
    priority.value = task.priority;
    project.value = task.project;
  }
  static removeTaskCard() {
    // document.querySelector(".task-card").remove();
  }
  static clearTaskCards() {
    const taskCards = document.querySelectorAll(".task-card");
    taskCards.forEach((task) => task.remove());
  }
  static filterTasks(filterCriteria) {
    this.clearTaskCards();
    TaskController.getAllTasks()
      .filter(filterCriteria)
      .forEach((task) => this.displayTask(task));
  }
  static toggleCheckbox(e) {
    const taskCard = e.target.closest(".task-card");
    const projectName = taskCard.querySelector(".project-name").textContent;
    const id = parseInt(taskCard.dataset.taskId);
    const isChecked = e.target.checked;
    if (projectName !== "all-tasks") {
      const projects = ProjectController.getAllProjects();
      const project = ProjectController.getProjectByTitle(projectName, projects);
      if (!project) return;
      const task = TaskController.getTaskById(id, project.tasksList);
      task.isComplete = isChecked;
      localStorage.setItem("projects", JSON.stringify(projects));
    }
    const allTasks = TaskController.getAllTasks();
    const task = allTasks.find((task) => task.id === id);
    if (!task) return;
    task.isComplete = isChecked;
    localStorage.setItem("all tasks", JSON.stringify(allTasks));
    if (task.isComplete) {
      taskCard.querySelector(".task-title").classList.add("strikethrough");
      taskCard
        .querySelector(".task-description")
        .classList.add("strikethrough");
      taskCard.querySelector(".due-date").classList.add("strikethrough");
    } else {
      taskCard.querySelector(".task-title").classList.remove("strikethrough");
      taskCard
        .querySelector(".task-description")
        .classList.remove("strikethrough");
      taskCard.querySelector(".due-date").classList.remove("strikethrough");
    }
  }
}
