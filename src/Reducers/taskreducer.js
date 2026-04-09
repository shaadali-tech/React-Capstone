function reducer(state, action) {
  if (action.type === "ADD_TASK") {
    return [...state, action.payload];
  }

  if (action.type === "DELETE_TASK") {
    return state.filter((task) => task.id !== action.payload);
  }

  if (action.type === "TOGGLE_TASK") {
    return state.map((task) => {
      if (task.id === action.payload) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
  }

  if (action.type === "CLEAR_TASKS") {
    return [];
  }

  return state;
}

export default reducer;
