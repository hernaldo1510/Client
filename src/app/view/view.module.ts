import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProgressModule } from '@app/_blocks/progress/progress.module';
import { ViewComponent } from './view/view.component';
import { CheckComponent } from './check/check.component';

const routes: Routes = [
  { path: ':id/token/:token', component: CheckComponent },
  { path: ':id', component: ViewComponent }
];

@NgModule({
  declarations: [ViewComponent, CheckComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ProgressModule]
})
export class ViewModule {}
