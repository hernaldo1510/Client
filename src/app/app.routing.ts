import { Routes } from '@angular/router';
// Layouts
import {
  CondensedComponent,
  BlankComponent,
  CorporateLayout,
  SimplyWhiteLayout,
  ExecutiveLayout,
  CasualLayout,
  BlankCasualComponent,
  BlankCorporateComponent,
  BlankSimplywhiteComponent
} from './@pages/layouts';

export const AppRoutes: Routes = [
  {
    path: '',
    component: CondensedComponent,
    children: [{
      path: 'rme',
      loadChildren: './rme/rme.module#RmeModule'
    }],
  },
  {
    path: '',
    component: BlankComponent,
    children: [{
      path: 'session',
      loadChildren: './session/session.module#SessionModule'
    }],
  }
];
