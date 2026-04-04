import React, { useState } from "react";
function TaskForm({ onTaskSubmit }) {
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onTaskSubmit(input);
    setInput({ title: "", description: "" });
  }
  return (
    <div>
      <h2>Task Form</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={input.title}
            onChange={(e) => setInput({ ...input, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={input.description}
            onChange={(e) =>
              setInput({ ...input, description: e.target.value })
            }
          ></textarea>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
