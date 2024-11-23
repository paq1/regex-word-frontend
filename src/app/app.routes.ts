import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: () => {
      return 'home-page'
    },
    pathMatch: 'full'
  },
  {
    path: 'home-page',
    loadComponent: () => import('./feature/regexword/components/tableau-regex/tableau-regex.component').then(c => c.TableauRegexComponent)
  },
  {
    path: 'rules',
    loadComponent: () => import('./feature/rules/rules.component').then(c => c.RulesComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./feature/regexword/components/tableau-regex/tableau-regex.component').then(c => c.TableauRegexComponent)
  },
];
