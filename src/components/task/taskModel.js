let id = parseInt(localStorage.getItem('taskId')) || 0;

export default (title, description, dueDate, priority, project) => {
  let isComplete = false;
  const setCompleteStatus = () => isComplete = !isComplete;
  id++;

  return {
    id,
    title,
    description,
    dueDate,
    priority,
    project,
    get isComplete() {
      return isComplete;
    },
    setCompleteStatus,
  };
};
