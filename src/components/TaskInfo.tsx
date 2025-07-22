import { Link } from "react-router-dom";
import type { Tasks } from "../generated/api/models/Tasks";
import classes from "./TaskInfo.module.css";


export function TaskInfo({task, onClose}: {task: Tasks; onClose: () => void;}) {
  return (
    <div className={classes.sidebar}>
      <button className={classes.closeButton} onClick={onClose}>
        ×
      </button>
      <div className={classes.task_name}>
        <h3>{task.name}</h3>
        <Link to={`/task/${task.id}/edit`}> <span className="material-symbols-outlined">edit</span> </Link>
      </div>
      <p>
        <strong>ID:</strong> {task.id}
      </p>
      <p>
        <strong>Descrizione:</strong>{" "}
        {task.description || "Nessuna descrizione."}
      </p>
      <p>
        <strong>Data di inizio:</strong>{" "}
        {task.startDate
          ? new Date(task.startDate).toLocaleDateString()
          : "Nessuna data di inizio."}
      </p>
      <p>
        <strong>Durata:</strong> {task.duration || "Nessuna durata."} giorni
      </p>
    </div>
  );
}
