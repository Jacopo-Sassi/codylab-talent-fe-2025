import { useEffect, useState } from "react";

export function useAuth() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8090/api/v1/projects", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403 || res.status === 405) {
          window.location.href =
            "http://localhost:8090/oauth2/authorization/codylab-2025";
        } else if (res.ok) {
          setLoading(false);
        } else {
          console.error("Unexpected response:", res);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("fetch error:", err);
        setLoading(false);
      });
  }, []);

  return { loading };
}
