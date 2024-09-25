import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'API',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44344/',
    redirectUri: baseUrl,
    clientId: 'API_App',
    responseType: 'code',
    scope: 'offline_access API',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44344',
      rootNamespace: 'Inspol.API',
    },
  },
} as Environment;
