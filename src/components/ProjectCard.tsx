import classes from "./ProjectCard.module.css";

export function ProjectCard() {
  return (
    <section className={classes.project}>
      <h2>Project Name</h2>
      <div className={classes.tasks}>
        <ul>
          <li>Task 1</li>
          <li>Task 2</li>
          <li>Task 3</li>
          <a >Nuova Task</a>
        </ul>
      </div>
      
    </section>
  );
}
