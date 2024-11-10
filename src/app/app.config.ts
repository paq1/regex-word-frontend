import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {tableReducer} from './store/reducer/reducer';
import {provideEffects} from '@ngrx/effects';
import {TableEffects} from './store/effects/TableEffects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ tasks: tableReducer }),
    provideEffects([TableEffects]),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes)
  ]
};
