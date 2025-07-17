import classes from "./ProjectCard.module.css";
import type { Projects } from "../generated/api/models/Projects";

export function ProjectCard({ project }: { project: Projects }) {
  return (
    <section className={classes.project}>
      <h2>{project.name}</h2>
      <div className={classes.tasks}>
        <ul>
          {project.tasks.map((task) => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
        <li className={classes.newTask}><a href="#">Nuova Task</a></li>
      </div>
    </section>
  );
}
