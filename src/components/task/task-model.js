export default class Task {
  static #currentId = parseInt(localStorage.getItem("task id")) || 1;
  #id;

  constructor(title, description, dueDate, priority, project) {
    this.#id = Task.#currentId;
    Task.#currentId += 1;
    localStorage.setItem("task id", Task.#currentId);
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.isComplete = false;
  }

  get id() {
    return this.#id;
  }
}
