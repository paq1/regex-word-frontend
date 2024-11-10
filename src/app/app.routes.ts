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
    loadComponent: () => import('./components/home-page/home-page.component').then(c => c.HomePageComponent)
  },
  {
    path: 'rules',
    loadComponent: () => import('./components/rules/rules.component').then(c => c.RulesComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./components/home-page/home-page.component').then(c => c.HomePageComponent)
  },
];
