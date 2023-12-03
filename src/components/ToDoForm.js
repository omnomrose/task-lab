import { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { TodoContext } from "../data/ToDoContext";

export default function TodoForm() {
  const {
    tasks,
    addTask,
    updateTask,
    editing,
    setTasks,
  } = useContext(TodoContext);

  let initialData = {
    title: "",
  };

  if (editing !== "new") {
    initialData = tasks.find(function (p) {
      return p.id === editing;
    });
  }

  const [task, setTask] = useState(initialData);

  function handleSubmit(e) {
    e.preventDefault();

    if (editing === "new") {
      const newTask = {
        ...task,
        id: nanoid(),
        complete: false,
        startTime: new Date().toLocaleTimeString(),
      };

      addTask(newTask);
    } else {
      updateTask(task);
    }

    setTask({ title: "" });
  }

  function handleTitleChange(e, field) {
    setTask({ ...task, [field]: e.target.value });
  }

  function toggleComplete(task) {
    const updatedTasks = tasks.map(function (t) {
      if (t.id === task.id) {
        t.complete = !t.complete;
        if (t.complete) {
          t.completionTime = new Date().toLocaleTimeString();
        } else {
          t.completionTime = null;
        }
      }
      return t;
    });
    setTasks(updatedTasks);
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="text"
              onChange={(e) => handleTitleChange(e, "title")}
              value={task.title}
              className="form-input"
              placeholder="Add new task..."
            />
          </label>
        </div>
        <div className="form-btns">
          <button className="add" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}
