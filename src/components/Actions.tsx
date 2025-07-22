import classes from './Actions.module.css';
import { Link } from "react-router-dom";

export function Actions() {
  return (
    <div className={classes.actions}>
      <ul>
        <li>
          <Link to="/add-project" className={classes.link}>Nuovo progetto</Link>
        </li>
      </ul>
    </div>
  );
}