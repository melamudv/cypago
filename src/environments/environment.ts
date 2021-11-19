// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  FLOOR_SIZE_IN_PX: 55,
  FLOOR_MARGIN_IN_PX: 7,
  DEFAULT_CURRENT_FLOOR: 0,
  DEFAULT_TIME_BETWEEN_FLOORS: 0.5,
  DEFAULT_STOPPING_TIME_AT_FLOOR: 2,
  ASSETS_URL: '/assets/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
