import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonsModule, TypeaheadModule, ModalModule, BsDatepickerModule} from 'ngx-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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

@NgModule({
  imports: [
    CommonModule,
    RmeRoutingModule,
    FormsModule,
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SharedModule,
    pgCardModule,
    ProgressModule,
    FontAwesomeModule
  ],
  declarations: [NewComponent, BlockRecipeComponent, BlockFrequentMedComponent, BlockPatientComponent, BlockProfessionalComponent, BlockMedicationRecipeComponent]
})
export class RmeModule { }
