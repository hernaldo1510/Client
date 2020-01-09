import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { ByAppointmentComponent } from './list/by-appointment/by-appointment.component';
import { ByPatientComponent } from './list/by-patient/by-patient.component';
import { ByProfessionalComponent } from './list/by-professional/by-professional.component';
/* import { BySearchComponent } from './list/by-search/by-search.component'; */

const routes: Routes = [
  { path: 'new', component: NewComponent },
  { path: 'new/pat/:pat', component: NewComponent },
  { path: 'new/pat/:pat/appo/:appo', component: NewComponent },
  { path: 'new/pro/:pro/pat/:pat', component: NewComponent },
  { path: 'new/pro/:pro/pat/:pat/token/:token', component: NewComponent },
  { path: 'new/pro/:pro/pat/:pat/appo/:appo', component: NewComponent },
  { path: 'new/pro/:pro/pat/:pat/appo/:appo/token/:token', component: NewComponent },
  { path: 'new/pro/:pro/pat/:pat/bdup/:bdup/appo/:appo/spe/:spe/center/:center', component: NewComponent },
  { path: 'list', component: ByProfessionalComponent },
  { path: 'list/pat/:pat/appo/:appo', component: ByAppointmentComponent },
  { path: 'list/pat/:pat/bdup/:bdup/appo/:appo', component: ByAppointmentComponent },
  { path: 'list/pat/:pat', component: ByPatientComponent },
  { path: 'list/pat/:pat/bdup/:bdup', component: ByPatientComponent },
 /*  { path: 'search', component: BySearchComponent } */

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class RmeRoutingModule { }
