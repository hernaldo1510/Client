import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProgressModule } from '@app/_blocks/progress/progress.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { CheckComponent } from './check/check.component';

const routes: Routes = [
  { path: 'error', component: ForbiddenComponent },
  { path: 'check/pro/:pro/pat/:pat/token/:token', component: CheckComponent },
  { path: 'check/pro/:pro/pat/:pat/bdup/:bdup/appo/:appo/spe/:spe/center/:center/token/:token', component: CheckComponent },
  { path: 'check/pro/:pro/pat/:pat/bdup/:bdup/token/:token', component: CheckComponent },
  { path: 'check/pro/:pro/pat/:pat/appo/:appo/token/:token', component: CheckComponent },
];

@NgModule({
  declarations: [ForbiddenComponent, CheckComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ProgressModule]
})
export class SessionModule {}
