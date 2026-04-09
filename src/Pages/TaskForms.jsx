import TaskForm from "../Components/TaskForm";

function TaskForms({ addTask }) {
  return (
    <div>
      <h1>Task Forms</h1>
      <TaskForm onTaskSubmit={addTask} />
    </div>
  );
}

export default TaskForms;
