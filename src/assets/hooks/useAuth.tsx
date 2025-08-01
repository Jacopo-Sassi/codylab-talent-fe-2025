import { useEffect, useState } from "react";
import keycloak from "../../components/keycloak";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let refreshInterval: ReturnType<typeof setInterval> | undefined;
    let logoutTimer: ReturnType<typeof setTimeout>;

    const resetLogoutTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        console.warn("Inattività prolungata: eseguo il logout.");
        keycloak.logout();
      }, 3 * 60000);
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

    keycloak
      .init({
        onLoad: "login-required",
        checkLoginIframe: false,
        pkceMethod: "S256",
        redirectUri: "http://localhost:5173",
      })
      .then((auth) => {
        setAuthenticated(auth);
        setToken(keycloak.token);
        setLoading(false);

        if (auth) {
          startInactivityWatcher();

          refreshInterval = setInterval(() => {
            keycloak
              .updateToken(70)
              .then((refreshed) => {
                if (refreshed && keycloak.token) {
                  setToken(keycloak.token);
                }
              })
              .catch((error) => {
                console.warn("Impossibile aggiornare il token, eseguo login.", error);
                setAuthenticated(false);
                setToken(undefined);
                stopInactivityWatcher();
                keycloak.login();
              });
          }, 60000);
        }
      })
      .catch((err) => {
        console.error("Errore inizializzazione Keycloak", err);
        setAuthenticated(false);
        setLoading(false);
      });

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
      stopInactivityWatcher();
    };
  }, []);

  return { loading, authenticated, token, keycloak };
}
