import classes from "./App.module.css";
import { Header } from "./components/Header";
import { ProjectList } from "./components/ProjectList";
import { useAuth } from "./assets/hooks/Auth";

function App() {
   const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
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
