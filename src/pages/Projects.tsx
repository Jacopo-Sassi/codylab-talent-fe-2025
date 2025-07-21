// Projects.jsx
import classes from "./Projects.module.css";
import { ProjectList } from "../components/ProjectList";
export function Projects() {
  return (
      <main className={classes.main}>
       <ProjectList />
      </main>
  );
}
