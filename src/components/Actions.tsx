import classes from './Actions.module.css';

export function Actions() {
  return (
    <div className={classes.actions}>
      <ul>
        <li>
          <a href="/add-project">Nuovo progetto</a>
        </li>
      </ul>
    </div>
  );
}