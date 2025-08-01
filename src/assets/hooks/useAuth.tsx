import { useEffect, useState } from "react";
import keycloak from "../../components/keycloak";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let refreshInterval: ReturnType<typeof setInterval> | undefined;

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

        refreshInterval = setInterval(() => {
          keycloak
            .updateToken(70)
            .then((refreshed) => {
              if (refreshed && keycloak.token) {
                setToken(keycloak.token);
              }
            })
            .catch((error) => {
              console.warn("Impossibile aggiornare il token, si richiede il login.", error);
              setAuthenticated(false);
              setToken(undefined);
              keycloak.login();
            });
        }, 60000);
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
    };
  }, []);

  return { loading, authenticated, token, keycloak };
}
