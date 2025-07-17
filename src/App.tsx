import classes from "./App.module.css";
import { Header } from "./components/Header";
import { ProjectList } from "./components/ProjectList";

function App() {
  return (
     <div className={classes.app}>
      <Header />
      <main className={classes.main}>
       <ProjectList />
      </main>
    </div>
  );
}

export default App;
