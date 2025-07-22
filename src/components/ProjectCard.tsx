import type { Projects } from "../generated/api/models/Projects";
import type { Tasks } from "../generated/api/models/Tasks";
import classes from "./ProjectCard.module.css";

export function ProjectCard({project,onProjectClick, onTaskClick}: {project: Projects;onProjectClick: (project: Projects) => void; onTaskClick: (task: Tasks) => void}) {
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
          <a href="#">Nuova Task</a>
        </li>
      </div>
    </section>
  );
}
