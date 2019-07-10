import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
// rme/new/pro/{run_usuario}/pat/{run_paciente}/bdup/{bdup}/appo/{id_cita}/spe/{id_especialidad}/center/{id_centro}
const routes: Routes = [
  { path: 'new', component: NewComponent },
  { path: 'new/pro/:pro/pat/:pat', component: NewComponent },
  { path: 'new/pro/:pro/pat/:pat/bdup/:bdup/appo/:appo/spe/:spe/center/:center', component: NewComponent },
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
