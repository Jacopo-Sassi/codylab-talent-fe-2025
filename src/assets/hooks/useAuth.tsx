import { useState, useEffect } from "react";
import keycloak from "../../components/keycloak";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(keycloak.authenticated ?? false);
  const [token, setToken] = useState<string | undefined>(keycloak.token);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    setLoading(false);

    const refreshInterval = setInterval(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            setToken(keycloak.token);
          }
        })
        .catch(() => {
          console.warn("Token scaduto, richiedendo login");
          keycloak.login();
        });
    }, 60000);

    return () => clearInterval(refreshInterval);
  }, []);

  return {
    loading,
    authenticated,
    token,
    keycloak,
  };
}
