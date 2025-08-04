import { useEffect, useRef, useState } from "react";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const refreshInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keycloakInstance = useRef<any>(null);

  useEffect(() => {
    const resetLogoutTimer = () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
      logoutTimer.current = setTimeout(() => {
        console.warn("Inattività prolungata: eseguo il logout.");
        keycloakInstance.current?.logout();
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
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };

    const initialize = async () => {
      try {
        const { default: keycloak } = await import("../../components/keycloak");
        keycloakInstance.current = keycloak;

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

          refreshInterval.current = setInterval(() => {
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
      if (refreshInterval.current) clearInterval(refreshInterval.current);
      stopInactivityWatcher();
    };
  }, []);

  return { loading, authenticated, token };
}
