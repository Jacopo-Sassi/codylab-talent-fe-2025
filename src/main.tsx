import { createRoot } from "react-dom/client";
import App from "./App";
import keycloak from "./components/keycloak";

// async function enableMocking() {
//   if (process.env.NODE_ENV !== "development") {
//     return;
//   }
//   const { worker } = await import("./mocks/browser.js");
//   return worker.start();
// }

// enableMocking().then(() => {
//   createRoot(document.getElementById("root")!).render(<App />);
// });

keycloak
  .init({
    onLoad: "login-required",
    checkLoginIframe: false,
    pkceMethod: "S256",
    redirectUri: "http://localhost:5173",
  })
  .then((authenticated) => {
    if (authenticated) {
      createRoot(document.getElementById("root")!).render(<App />);
    } else {
      keycloak.login();
    }
  })
  .catch((err) => {
    console.error("Errore durante init Keycloak", err);
  });
