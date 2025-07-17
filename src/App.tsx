import classes from "./App.module.css";
import { Header } from "./components/Header";
import { ProjectCard } from "./components/ProjectCard";

function App() {
  return (
     <div className={classes.app}>
      <Header />
      <main className={classes.main}>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </main>
    </div>
  );
}

export default App;
