import { useParams } from "react-router-dom";
import type { Users } from "../generated/api/models/Users";
import classes from "./UserCard.module.css";

export function UserCard({ user, onUserClick }: { user: Users; onUserClick: (user: Users) => void }) {
  const {userId} = useParams();


  return (
    <section className={`${classes.user} ${user.id?.toString() === userId ? classes.active : ""}`}>
      <h2 onClick={() => onUserClick(user)}>{user.firstName} {user.lastName}</h2>
      <div className={classes.tasks}>
        {user.tasks?.map((task) => (
          <div key={task.id}>
            <h4>{task.projectId}</h4>
            <ul>
              <li>{task.name}</li>
            </ul>
          </div>
        ))}
        <p className={classes.newTask}>Nuova Task</p>
      </div>
    </section>
  );
}
