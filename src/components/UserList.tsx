import type {  Users } from "../generated/api/models/Users";
import { users } from "../lib/api/api";
import { UserCard } from "./UserCard";
import { useEffect, useState } from "react";

export function UserList() {
  const [usersData, setUsersData] = useState<Users[]>([]);

  useEffect(() => {
    users
      .getUsers({
        pageNumber: 0,
        size: 10,
        sort: "id",
      })
      .then((res) => setUsersData(res || []))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(usersData);
  return (
    <>
      {usersData.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </>
  );
}
