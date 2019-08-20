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
import { AuthGuardService } from './_service/auth-guard.service';

export const AppRoutes: Routes = [
  {
    path: '',
    component: CondensedComponent,
    children: [{
      path: 'rme',
      loadChildren: './rme/rme.module#RmeModule'
    }],
    canActivate: [AuthGuardService]
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
