import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';

import { SharedModule } from '../../shared/modules/shared/shared.module';
import { PageHeaderModule } from './../../shared';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderModule,
    EmployeeRoutingModule,
    SharedModule,
    NgbModule.forRoot(),
    AngularMultiSelectModule,
    MultiselectDropdownModule
  ],

  declarations: [
    EmployeeComponent,
    EmployeeDetailComponent
  ]
})
export class EmployeeModule {


}
