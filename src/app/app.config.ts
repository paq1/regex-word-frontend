import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import {routerReducer} from '@ngrx/router-store';
import {tableReducer} from './store/reducer/reducer';
import {provideEffects} from '@ngrx/effects';
import {TableEffects} from './store/effects/TableEffects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({router: routerReducer},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true,
        },
      }),
    provideState({name: 'app', reducer: tableReducer}),
    provideEffects([TableEffects]),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes)
  ]
};
