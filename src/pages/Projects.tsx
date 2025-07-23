import classes from "./Projects.module.css";
import { ProjectList } from "../components/ProjectList";

type ProjectsProps = {
  searchTerm: string;
};

export function Projects({ searchTerm }: ProjectsProps) {
  return (
    <main className={classes.main}>
      <ProjectList searchTerm={searchTerm} />
    </main>
  );
}
