import TaskForm from "../Components/TaskForm";

function TaskForms({ addTask }) {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white py-4">
              <h2 className="card-title mb-0">
                <i className="bi bi-plus-circle me-2"></i>Add New Task
              </h2>
            </div>
            <div className="card-body p-4">
              <TaskForm onTaskSubmit={addTask} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskForms;
