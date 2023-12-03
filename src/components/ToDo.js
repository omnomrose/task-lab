import SvgIcon from "@mui/material/SvgIcon";
import { TodoContext } from "../data/ToDoContext";
import { useContext } from "react";

export default function Todo(props) {
  const { setEditing, updateTask } = useContext(TodoContext);
  const task = props.task;

  function handleDelete() {
    props.remove(task);
  }

  function handleEdit() {
    setEditing(task.id);
  }

  function handleStatusChange() {
    const updatedTask = {
      ...task,
      complete: !task.complete,
    };

    if (updatedTask.complete) {
      updatedTask.completionTime = new Date().toLocaleTimeString();
    } else {
      updatedTask.completionTime = null;
    }

    updateTask(updatedTask);
  }

  return (
    <div className="singleTask">
      <div className="todoDetails">
        <input
          type="checkbox"
          onChange={handleStatusChange}
          value={task.clicked}
          checked={task.complete}
        />
        <label className={task.complete ? "completed" : ""}>{task.title}</label>
        {task.startTime && <p>Started at {task.startTime}</p>}
        {task.complete && <p>Completed at {task.completionTime}</p>}
      </div>
      <div className="buttons">
        <button onClick={handleEdit} className="edit-btn">
          <SvgIcon viewBox="0 0 24 24" fontSize="medium">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
          </SvgIcon>
        </button>
        <button onClick={handleDelete} className="delete-btn">
          <SvgIcon viewBox="0 0 24 24" fontSize="medium">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
          </SvgIcon>
        </button>
      </div>
    </div>
  );
}
