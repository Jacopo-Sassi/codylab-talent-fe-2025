import { UserList } from "../components/UserList";
import classes from "./Workload.module.css";

type WorkloadProps = {
  searchTerm: string;
};

export function Workload({ searchTerm }: WorkloadProps) {
  return (
    <main className={classes.main}>
      <UserList searchTerm={searchTerm} />
    </main>
  );
}
