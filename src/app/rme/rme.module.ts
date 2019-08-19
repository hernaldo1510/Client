import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ButtonsModule,
  TypeaheadModule,
  ModalModule,
  BsDatepickerModule
} from 'ngx-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ProgressModule } from '@app/_blocks/progress/progress.module';

import { NewComponent } from './new/new.component';
import { BlockRecipeComponent } from './block-recipe/block-recipe.component';
import { BlockFrequentMedComponent } from './block-frequent-med/block-frequent-med.component';
import { RmeRoutingModule } from './rme-routing.module';
import { SharedModule } from '@app/@pages/components/shared.module';
import { BlockPatientComponent } from './block-patient/block-patient.component';
import { pgCardModule } from '@app/@pages/components/card/card.module';
import { BlockProfessionalComponent } from './block-professional/block-professional.component';
import { BlockMedicationRecipeComponent } from './block-medication-recipe/block-medication-recipe.component';
import { ByAppointmentComponent } from './list/by-appointment/by-appointment.component';
import { ByPatientComponent } from './list/by-patient/by-patient.component';
import { BlockRecipeIndicationComponent } from './block-recipe-indication/block-recipe-indication.component';
import { BlockRecipeListComponent } from './block-recipe-list/block-recipe-list.component';
import { ModalRecipeComponent } from './modal-recipe/modal-recipe.component';
import { ByProfessionalComponent } from './list/by-professional/by-professional.component';
import { BlockPatientInfoComponent } from './block-patient-info/block-patient-info.component';

@NgModule({
  imports: [
    CommonModule,
    RmeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SharedModule,
    pgCardModule,
    ProgressModule,
    FontAwesomeModule,
    NgxDatatableModule
  ],
  declarations: [
    NewComponent,
    BlockRecipeComponent,
    BlockFrequentMedComponent,
    BlockPatientComponent,
    BlockProfessionalComponent,
    BlockMedicationRecipeComponent,
    ByAppointmentComponent,
    ByPatientComponent,
    BlockRecipeIndicationComponent,
    BlockRecipeListComponent,
    ModalRecipeComponent,
    ByProfessionalComponent,
    BlockPatientInfoComponent
  ],
  entryComponents: [ModalRecipeComponent]
})
export class RmeModule {}
