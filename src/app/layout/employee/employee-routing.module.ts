import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeComponent} from './employee.component';
import { EmployeeDetailComponent } from '../employee/employee-detail/employee-detail.component';

const routes: Routes = [
  {
    //path: '', component: EmployeeComponent
    path: '',
      children: [
          {
              path: '',
              component: EmployeeComponent
          },
          {
              path: 'newemployee',
              component: EmployeeDetailComponent
          },
          {
              path:'viewemployee/:EmpGuid',
              component: EmployeeDetailComponent
          }
      ]
   
  }
 ];

 @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class EmployeeRoutingModule { }
