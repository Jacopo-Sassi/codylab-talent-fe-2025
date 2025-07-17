import classes from './Search.module.css';

export function Search() {
  return (
    <div className={classes.search}>
      <input
        type="text"
        placeholder="Search projects, tasks, and more..."
        aria-label="Search"
      />
    </div>
  );
}
