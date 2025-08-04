import { useEffect, useState } from "react";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let refreshInterval: ReturnType<typeof setInterval> | undefined;
    let logoutTimer: ReturnType<typeof setTimeout>;

    let keycloakInstance: any;

    const resetLogoutTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        console.warn("Inattività prolungata: eseguo il logout.");
        keycloakInstance.logout();
      }, 1 * 60000);
    };

    const startInactivityWatcher = () => {
      document.addEventListener("mousemove", resetLogoutTimer);
      document.addEventListener("keydown", resetLogoutTimer);
      document.addEventListener("click", resetLogoutTimer);
      document.addEventListener("scroll", resetLogoutTimer);
      resetLogoutTimer();
    };

    const stopInactivityWatcher = () => {
      document.removeEventListener("mousemove", resetLogoutTimer);
      document.removeEventListener("keydown", resetLogoutTimer);
      document.removeEventListener("click", resetLogoutTimer);
      document.removeEventListener("scroll", resetLogoutTimer);
      clearTimeout(logoutTimer);
    };

    const initialize = async () => {
      try {
        const { default: keycloak } = await import("../../components/keycloak");
        keycloakInstance = keycloak;

        const auth = await keycloak.init({
          onLoad: "login-required",
          checkLoginIframe: false,
          pkceMethod: "S256",
          redirectUri: window.location.origin,
        });

        setAuthenticated(auth);
        setToken(keycloak.token);
        setLoading(false);

        if (auth) {
          startInactivityWatcher();

          refreshInterval = setInterval(() => {
            keycloak
              .updateToken(70)
              .then((refreshed: boolean) => {
                if (refreshed && keycloak.token) {
                  setToken(keycloak.token);
                }
              })
              .catch((error: any) => {
                console.warn("Impossibile aggiornare il token, eseguo login.", error);
                setAuthenticated(false);
                setToken(undefined);
                stopInactivityWatcher();
                keycloak.login();
              });
          }, 60000);
        }
      } catch (err) {
        console.error("Errore inizializzazione Keycloak", err);
        setAuthenticated(false);
        setLoading(false);
      }
    };

    initialize();

    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
      stopInactivityWatcher();
    };
  }, []);

  return { loading, authenticated, token };
}
