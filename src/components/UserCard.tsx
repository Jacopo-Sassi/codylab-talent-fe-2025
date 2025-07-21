import classes from "./UserCard.module.css";
import type { Users } from "../generated/api/models/Users";

export function UserCard({ user }: { user: Users }) {
  return (
    <section className={classes.user}>
      <h2>{user.firstName}</h2>
      <div className={classes.tasks}>
        <ul>
          {user.tasks?.map((task) => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
        <li className={classes.newTask}><a href="#">Nuova Task</a></li>
      </div>
    </section>
  );
}
