import classes from './Navigation.module.css';

export function Navigation() {
  return (
    <nav className={classes.navigation}>
      <ul>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#workload">Workload</a>
        </li>
      </ul>
    </nav>
  );
}