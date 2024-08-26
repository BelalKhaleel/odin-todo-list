export default (title, description, dueDate, priority, project) => {
  let isComplete = false;
  const setCompleteStatus = () => isComplete = !isComplete;

  return {
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
