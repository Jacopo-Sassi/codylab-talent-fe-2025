import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Users } from "../generated/api/models/Users";
import { users } from "../lib/api/api";
import { UserCard } from "./UserCard";

type UserListProps = {
  searchTerm: string;
};

export function UserList({ searchTerm = "" }: UserListProps) {
  const [usersData, setUsersData] = useState<Users[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user");

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

  return (
    <>
      {usersData
        .filter(
          (user) =>
            searchTerm === "" ||
            user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
    </>
  );
}
