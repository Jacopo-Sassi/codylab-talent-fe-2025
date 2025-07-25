import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { WorkloadContext } from "../pages/WorkloadContext";
import classes from "./UserInfo.module.css";

export function UserInfo() {
  const { userId } = useParams();
  const { workloadData } = useContext(WorkloadContext);
  const navigate = useNavigate();
  const onClose = () => {
    navigate("/workload");
  };

  const user = workloadData.find((user) => user.id === Number(userId));

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className={classes.sidebar}>
      <button className={classes.closeButton} onClick={onClose}>
        ×
      </button>
      <div className={classes.user_fistName}>
        <h3>{user.firstName}</h3>
        <Link to={`/user/${user.id}/edit`}>
          {" "}
          <span className="material-symbols-outlined">edit</span>{" "}
        </Link>
      </div>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Descrizione:</strong> {user.email || "Nessuna descrizione."}
      </p>
      <p>
        <strong>Durata:</strong> {user.dailyHours || "Nessuna durata."} giorni
      </p>
    </div>
  );
}
