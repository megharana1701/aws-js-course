// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Config } from './config.interface';

export const environment: Config = {
  production: false,
  apiEndpoints: {
    product: 'https://hk5r51lt41.execute-api.ap-south-1.amazonaws.com/prod',
    order: 'https://hk5r51lt41.execute-api.ap-south-1.amazonaws.com/prod',
    import: 'https://3fjvjjzfg4.execute-api.ap-south-1.amazonaws.com/prod',
    bff: 'https://hk5r51lt41.execute-api.ap-south-1.amazonaws.com/prod',
    cart: 'https://hk5r51lt41.execute-api.ap-south-1.amazonaws.com/prod',
  },
  apiEndpointsEnabled: {
    product: true,
    order: true,
    import: true,
    bff: true,
    cart: true,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
