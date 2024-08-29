import { auth } from 'express-oauth2-jwt-bearer';

const checkJwt = auth({
  audience: 'https://dev-m84k5j50syqrc2d7.us.auth0.com/api/v2/',
  issuerBaseURL: 'https://dev-m84k5j50syqrc2d7.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

export default checkJwt;