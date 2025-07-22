import type { Projects } from "../generated/api/models/Projects";
import type { Tasks } from "../generated/api/models/Tasks";
import classes from "./ProjectCard.module.css";
import { useNavigate } from "react-router-dom";

export function ProjectCard({
  project,
  onProjectClick, onTaskClick
}: {
  project: Projects;
  onProjectClick: (project: Projects) => void; onTaskClick: (task: Tasks) => void
}) {
  const navigate = useNavigate();

  const handleNewTaskClick = () => {
    navigate("/tasks/add", {
      state: { projectId: project.id },
    });
  };

  return (
    <section className={classes.project}>
      <h2 onClick={() => onProjectClick(project)}>{project.name}</h2>
      <div className={classes.tasks}>
        <ul>
          {project.tasks.map((task) => (
            <li key={task.id} onClick={() => onTaskClick(task)}>
              {task.name}
            </li>
          ))}
        </ul>
          <li className={classes.newTask}>
            <p onClick={handleNewTaskClick}>Nuova Task</p>
          </li>
      </div>
    </section>
  );
}
