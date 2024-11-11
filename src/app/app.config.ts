import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {tableReducer} from './store/reducer/reducer';
import {provideEffects} from '@ngrx/effects';
import {TableEffects} from './store/effects/TableEffects';
import {provideStoreDevtools} from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ tableReducer }),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      // logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    provideEffects([TableEffects]),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes)
  ]
};
