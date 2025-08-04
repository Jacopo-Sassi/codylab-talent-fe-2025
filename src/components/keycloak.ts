import type KeycloakType from "keycloak-js";

let keycloak: KeycloakType | any;

if (import.meta.env.MODE === "production") {
  const { default: MockKeycloak } = await import("./MockKeycloak");
  keycloak = MockKeycloak;
} else {
  const Keycloak = (await import("keycloak-js")).default;
  keycloak = new Keycloak({
    url: "http://localhost:9090", 
    realm: "codylab",
    clientId: "cody-login",
  });
}

export default keycloak;
