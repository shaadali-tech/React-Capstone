import { useState, useMemo } from "react";

function Home({ tasks, dispatch }) {
  const [filter, setFilter] = useState("all");

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  const filteredTasks = useMemo(() => {
    if (filter === "completed") return tasks.filter((t) => t.completed);
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

  const handleTasksUI = () => {
    dispatch({ type: "CLEAR_TASKS" });
  };

  return (
    <div className="container-fluid py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-4 fw-bold text-dark mb-2">
            <i className="bi bi-list-check me-3"></i>Task Manager
          </h1>
          <p className="text-muted lead">
            Manage your tasks efficiently and stay organized!
          </p>
        </div>
      </div>

      <div className="row mb-4 g-3">
        <div className="col-md-4">
          <div className="card bg-primary text-white shadow-sm h-100">
            <div className="card-body">
              <h6 className="card-title text-uppercase opacity-75">
                Total Tasks
              </h6>
              <h2 className="card-text">{totalTasks}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white shadow-sm h-100">
            <div className="card-body">
              <h6 className="card-title text-uppercase opacity-75">
                Completed
              </h6>
              <h2 className="card-text">{completedTasks}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-dark shadow-sm h-100">
            <div className="card-body">
              <h6 className="card-title text-uppercase opacity-75">Pending</h6>
              <h2 className="card-text">{pendingTasks}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="btn-group w-100" role="group">
            <input
              type="radio"
              className="btn-check"
              name="filter"
              id="btnAll"
              checked={filter === "all"}
              onChange={() => setFilter("all")}
            />
            <label className="btn btn-outline-primary" htmlFor="btnAll">
              <i className="bi bi-funnel me-2"></i>All Tasks
            </label>

            <input
              type="radio"
              className="btn-check"
              name="filter"
              id="btnCompleted"
              checked={filter === "completed"}
              onChange={() => setFilter("completed")}
            />
            <label className="btn btn-outline-success" htmlFor="btnCompleted">
              <i className="bi bi-check-circle me-2"></i>Completed
            </label>

            <input
              type="radio"
              className="btn-check"
              name="filter"
              id="btnPending"
              checked={filter === "pending"}
              onChange={() => setFilter("pending")}
            />
            <label className="btn btn-outline-warning" htmlFor="btnPending">
              <i className="bi bi-clock me-2"></i>Pending
            </label>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="col-md-6 col-lg-4">
              <div
                className={`card h-100 shadow-sm border-0 ${task.completed ? "bg-light" : ""}`}
              >
                <div className="card-body">
                  <div className="d-flex align-items-start gap-2 mb-2">
                    <div className="flex-grow-1">
                      <h5
                        className={`card-title ${task.completed ? "text-decoration-line-through text-muted" : ""}`}
                      >
                        {task.title}
                      </h5>
                    </div>
                    <span
                      className={`badge ${task.completed ? "bg-success" : "bg-warning"}`}
                    >
                      {task.completed ? "Done" : "Pending"}
                    </span>
                  </div>
                  <p
                    className={`card-text ${task.completed ? "text-muted text-decoration-line-through" : "text-muted"}`}
                  >
                    {task.description || "No description"}
                  </p>
                </div>
                <div className="card-footer bg-white border-top py-2">
                  <div className="d-flex gap-2">
                    <button
                      onClick={() =>
                        dispatch({ type: "TOGGLE_TASK", payload: task.id })
                      }
                      className={`btn btn-sm flex-grow-1 ${task.completed ? "btn-warning" : "btn-success"}`}
                    >
                      <i
                        className={`bi ${task.completed ? "bi-arrow-counterclockwise" : "bi-check-circle"} me-1`}
                      ></i>
                      {task.completed ? "Undo" : "Complete"}
                    </button>
                    <button
                      onClick={() =>
                        dispatch({ type: "DELETE_TASK", payload: task.id })
                      }
                      className="btn btn-sm btn-danger"
                    >
                      <i className="bi bi-trash me-1"></i>Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center py-5" role="alert">
              <i className="bi bi-inbox display-4 d-block mb-3"></i>
              <h5>No tasks found</h5>
              <p className="text-muted mb-0">
                Create a new task to get started!
              </p>
            </div>
          </div>
        )}
      </div>

      {filteredTasks.length > 0 && (
        <div className="row">
          <div className="col-12">
            <button
              onClick={handleTasksUI}
              className="btn btn-danger btn-lg w-100"
            >
              <i className="bi bi-trash-fill me-2"></i>Clear All Tasks
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
