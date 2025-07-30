import {http, HttpResponse} from "msw";
import getUsers from "./stubs/getUsers.json";

export const users = [
  http.get("http://localhost:8090/api/v1/users", () => {
    return HttpResponse.json(getUsers);
  }),

    http.post("http://localhost:8090/api/v1/users", async ({ request }) => {
        const newUser = await request.clone().json();
        const id = Math.random();
        const fullUser = { id, ...newUser };
        getUsers.push(fullUser);
        return HttpResponse.json(getUsers);
    }),

    http.put(
        "http://localhost:8090/api/v1/users/:id",
        async ({ params, request }) => {
            const updatedUser = await request.clone().json();
            const { id } = params;

            const index = getUsers.findIndex((u) => String(u.id) === id);
            if (index !== -1) {
                getUsers[index] = { ...getUsers[index], ...updatedUser };
            }

            return HttpResponse.json(getUsers);
        })
    ];