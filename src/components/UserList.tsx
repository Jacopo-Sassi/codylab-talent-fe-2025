import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import type { Users } from "../generated/api/models/Users";
import { UserCard } from "./UserCard";
import { WorkloadContext } from "../pages/WorkloadContext";
import type { Tasks } from "../generated/api";

type UserListProps = {
  searchTerm: string;
};

export function UserList({ searchTerm = "" }: UserListProps) {
  const {workloadData} = useContext(WorkloadContext)
  const navigate = useNavigate();

  const handleUserClick = (user: Users) => {
    navigate(`/workload/user/${user.id}`, { replace: true });
  };

    const handleTaskClick = (task: Tasks) => {
      navigate(`/workload/task/${task.id}`, { replace: true });
    };

  return (
    <>
      {workloadData
        .filter(
          (user) =>
            searchTerm === "" ||
            user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((user) => (
          <UserCard key={user.id} user={user} onUserClick={handleUserClick} onTaskClick={handleTaskClick}/>
        ))}
      <Outlet />
    </>
  );
}
