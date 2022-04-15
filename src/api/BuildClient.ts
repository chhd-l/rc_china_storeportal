// import fetch from 'node-fetch';
import {
  ClientBuilder,
  Client,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const projectKey = '{projectKey}';
const scopes = ['manage_project:' + projectKey];

// create the authMiddlewareOptions object
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.{region}.commercetools.com',
  projectKey: projectKey,
  credentials: {
    clientId: '{clientID}',
    clientSecret: '{clientSecret}',
  },
  scopes,
  fetch,
};

// create the httpMiddlewareOptions object also
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.{region}.commercetools.com',
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // not necessary if the projectKey was already passed in the authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
// export {}