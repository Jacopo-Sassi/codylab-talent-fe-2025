import classes from "./App.module.css";
import Logo from "./assets/yplan-logo.png";
import { ProjectCard } from "./components/ProjectCard";

function App() {
  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <div className={classes.logo}>
          <img src={Logo} alt="logo" height={50} />
        </div>
        <div className={classes.navigation}>
          <ul>
            <li>
              <a>Projects</a>
            </li>
            <li>
              <a>Workload</a>
            </li>
          </ul>
        </div>
        <div className={classes.search}>
          <input
            type="text"
            placeholder="Search projects, tasks, and more..."
            aria-label="Search"
          />
        </div>
        <div className={classes.actions}>
          <ul>
            <li>
              <a>Nuovo progetto</a>
            </li>
          </ul>
        </div>
      </header>
      <main className={classes.main}>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </main>
    </div>
  );
}

export default App;
