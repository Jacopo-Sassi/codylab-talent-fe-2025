import { Configuration, ProjectsApi, SlotsApi, TasksApi, UsersApi } from "../../generated/api";
import keycloak from "../../components/keycloak";

const BASE_PATH = "http://localhost:8090/api/v1";

async function createConfig(): Promise<Configuration> {
  try {
    await keycloak.updateToken(70);
  } catch (error) {
    console.warn("Errore aggiornamento token", error);
    keycloak.login();
  }

  return new Configuration({
    basePath: BASE_PATH,
    credentials: "include",
    headers: {
      Authorization: keycloak.token ? `Bearer ${keycloak.token}` : "",
    },
  });
}

function createProxy(apiClass: any) {
  let instance: any;

  return new Proxy(
    {},
    {
      get(_target, prop, _receiver) {
        return async (...args: any[]) => {
          const config = await createConfig();
          instance = new apiClass(config);
          const method = instance[prop];
          if (typeof method === "function") {
            return method.apply(instance, args);
          }
          return method;
        };
      },
    }
  );
}

export const projects = createProxy(ProjectsApi);
export const slots = createProxy(SlotsApi);
export const tasks = createProxy(TasksApi);
export const users = createProxy(UsersApi);
