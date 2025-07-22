import type { Users } from "../generated/api/models/Users";
import classes from "./UserCard.module.css";

export function UserCard({ user }: { user: Users }) {
  return (
    <section className={classes.user}>
      <h2>{user.firstName}</h2>
      <div className={classes.tasks}>
        {user.tasks?.map((task) => (
          <div key={task.id}>
            <h4>{task.projectId}</h4>
            <ul>
              <li>{task.name}</li>
            </ul>
          </div>
        ))}
        <li className={classes.newTask}>
          <a href="#">Nuova Task</a>
        </li>
      </div>
    </section>
  );
}
