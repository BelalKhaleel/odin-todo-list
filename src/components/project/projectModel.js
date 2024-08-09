export default () => {
  const todosList = [];
  const addListToProject = (...todos) => todosList.push(...todos);
  return {
    todosList,
    addListToProject,
  }
}