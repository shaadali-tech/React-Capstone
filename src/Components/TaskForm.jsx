import { useState } from "react";

function TaskForm({ onTaskSubmit }) {
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!input.title.trim()) {
      newErrors.title = "Task title is required";
    }
    if (!input.description.trim()) {
      newErrors.description = "Task description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onTaskSubmit(input);
    setInput({ title: "", description: "" });
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label fw-semibold">
          <i className="bi bi-pencil-square me-2"></i>Task Title
        </label>
        <input
          type="text"
          className={`form-control form-control-lg ${errors.title ? "is-invalid" : ""}`}
          id="title"
          name="title"
          placeholder="Enter task title"
          value={input.title}
          onChange={(e) => {
            setInput({ ...input, title: e.target.value });
            if (errors.title) setErrors({ ...errors, title: "" });
          }}
        />
        {errors.title && (
          <div className="invalid-feedback d-block">{errors.title}</div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="form-label fw-semibold">
          <i className="bi bi-file-text me-2"></i>Description
        </label>
        <textarea
          className={`form-control form-control-lg ${errors.description ? "is-invalid" : ""}`}
          id="description"
          name="description"
          placeholder="Enter task description"
          rows="4"
          value={input.description}
          onChange={(e) => {
            setInput({ ...input, description: e.target.value });
            if (errors.description) setErrors({ ...errors, description: "" });
          }}
        ></textarea>
        {errors.description && (
          <div className="invalid-feedback d-block">{errors.description}</div>
        )}
      </div>

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary btn-lg">
          <i className="bi bi-check-circle me-2"></i>Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
