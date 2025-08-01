import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:9090/', 
  realm: 'codylab',              
  clientId: 'cody-login', 
      
});

export default keycloak;
