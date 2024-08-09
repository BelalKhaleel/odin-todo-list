export default (title, description, dueDate, priority) => {
  const notes = [];
  const addNote = (note) => notes.push(note);

  return {
    title,
    description,
    dueDate,
    priority,
    notes,
    addNote,
  };
};
