import classes from "./App.module.css";
import { Header } from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Workload } from './pages/Workload';
import { Projects } from './pages/Projects';

function App() {
  return (
    <div className={classes.app}>
      <Router>
        <Header />
        <Routes>
          <Route path="/projects" element={<Projects />} />
          <Route path="/workload" element={<Workload />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
