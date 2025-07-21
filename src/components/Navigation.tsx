import { Link } from 'react-router-dom';
import classes from './Navigation.module.css';

export function Navigation() {
  return (
    <nav className={classes.navigation}>
      <ul>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/workload">Workload</Link>
        </li>
      </ul>
    </nav>
  );
}
