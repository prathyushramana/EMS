import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { EmpProjComponent } from '../../emp-proj/emp-proj.component';
import { UserComponent } from '../../user/user.component';
import { TimesheetApproverComponent } from '../../timesheet-approver/timesheet-approver.component';
import { PaginationComponent } from '../../pagination/pagination.component';
// import { ModalComponent } from './modal/modal.component';
import { BooleanFilterPipe } from '../../boolen-filter.pipe';


@NgModule({
  imports: [    
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[CommonModule,EmpProjComponent,TimesheetApproverComponent,UserComponent,BooleanFilterPipe, PaginationComponent],
  declarations: [EmpProjComponent, TimesheetApproverComponent,UserComponent, BooleanFilterPipe, PaginationComponent]
})
export class SharedModule { }
