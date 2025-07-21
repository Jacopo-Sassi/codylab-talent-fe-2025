import { UserList } from "../components/UserList";
import classes from "./Workload.module.css";
export function Workload() {
  return (
      <main className={classes.main}>
       <UserList />
      </main>
  );
}
