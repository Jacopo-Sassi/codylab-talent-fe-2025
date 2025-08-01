import { Configuration, ProjectsApi, SlotsApi, TasksApi, UsersApi } from "../../generated/api";
import keycloak from "../../components/keycloak";

const BASE_PATH = "http://localhost:8090/api/v1";

function createConfig() {
  return new Configuration({
    basePath: BASE_PATH,
    credentials: "include",
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
    },
  });
}

function createProxy(apiClass: any) {
  let instance = new apiClass(createConfig());

  return new Proxy(instance, {
    get(target, prop, receiver) {
      instance = new apiClass(createConfig());
      return Reflect.get(instance, prop, receiver);
    },
  });
}

export const projects = createProxy(ProjectsApi);
export const slots = createProxy(SlotsApi);
export const tasks = createProxy(TasksApi);
export const users = createProxy(UsersApi);
