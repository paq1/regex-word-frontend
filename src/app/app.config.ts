import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import {routerReducer} from '@ngrx/router-store';
import {tableReducer} from './feature/regexword/store/reducer/reducer';
import {provideEffects} from '@ngrx/effects';
import {TableEffects} from './feature/regexword/store/effects/TableEffects';
import {provideHttpClient} from '@angular/common/http';

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
    provideHttpClient(),
    provideState({name: 'app', reducer: tableReducer}),
    provideEffects([TableEffects]),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes)
  ],
};
