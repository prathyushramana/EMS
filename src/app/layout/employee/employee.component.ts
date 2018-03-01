import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { routerTransition } from '../../router.animations';
import { EmployeeModelentity } from '../../models/employee-model-entity';
import { LookUpModelEntity } from '../../models/lookup-model-entity';
import { SupervisorModelEntity } from '../../models/supervisor-model-entity';

import { EmployeeService } from '../../shared/employee.service';
import { LookupService } from '../../shared/lookup.service';

@Component({ 
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  animations: [routerTransition()]
})
export class EmployeeComponent implements OnInit {

  private l_EmpListCollection: Array<EmployeeModelentity> = [];
  private statusMessage: string = "Loading....Please wait..";
  private all_lookUpValueCollection: LookUpModelEntity[];
  private dept_lookupValueCollection: LookUpModelEntity[];
  private emp_Type_lookupValueCollection: LookUpModelEntity[];
  private l_SupervisorModelEntity: SupervisorModelEntity[];
  private l_EmployeeModelentity: EmployeeModelentity = new EmployeeModelentity();
  private empCount: number = 0;

  constructor(private router: Router
    , private _employeeService: EmployeeService,
    private _lookUpService: LookupService
  ) { 
    this.l_EmployeeModelentity.IsActive = true;
    this.l_EmployeeModelentity.RowCount = 5;
  }

  ngOnInit() {

    this._lookUpService.getLookUpValueCollection()
      .subscribe((lookupList) => {
        this.all_lookUpValueCollection = lookupList;
        this.emp_Type_lookupValueCollection = this.all_lookUpValueCollection.filter((elm: LookUpModelEntity) => elm.LookUpGroupName === "employee_type");
        this.dept_lookupValueCollection = this.all_lookUpValueCollection.filter((elm: LookUpModelEntity) => elm.LookUpGroupName === "department");

        this._lookUpService.getSupervisorCollection()
          .subscribe((supervisorList) => {
            this.l_SupervisorModelEntity = supervisorList;
          }
          , (error) => {
            this.statusMessage = "Problem with Lookup Service, please try after some time";
            console.error(error);
          });
      }
      , (error) => {
        this.statusMessage = "Problem with Lookup Service, please try after some time";
        console.error(error);
      });
   
  }

  getEmployeeCollection() {
    this.empCount = 0;
    this.populateEmployeeCollection();
  }

  createNewEmployee() {
    this.router.navigate(['employee/newemployee']);
  }


  private populateEmployeeCollection() {   
    this._employeeService.getEmployeeCount(this.l_EmployeeModelentity)
      .subscribe((empCnt) => {
        this.empCount = empCnt;
        if (this.empCount > 0) {
          this.displayEmployeeDetails(null);
        }     
      }
      , (error) => {
        this.statusMessage = "Problem with Employee Service, please try after some time";
        console.error(error);
      });
  }

  private displayEmployeeDetails(argPageDetail: any){    
      if (argPageDetail != null) {
        this.l_EmployeeModelentity.RowCount = argPageDetail.rowCount;
        this.l_EmployeeModelentity.StartIndex = argPageDetail.startIndex;
        this.l_EmployeeModelentity.TerminalIndex = argPageDetail.endIndex;
      } else {
        if (this.l_EmployeeModelentity.RowCount == 0)
          this.l_EmployeeModelentity.RowCount = 5;
        this.l_EmployeeModelentity.StartIndex = undefined;
        this.l_EmployeeModelentity.TerminalIndex = undefined;
      }
      this.LoadEmployeeList();    
  }


  private LoadEmployeeList() {  
      this._employeeService.getEmployeeCollection(this.l_EmployeeModelentity)
        .subscribe((empList) => {
          this.l_EmpListCollection = empList;
          if (empList.length == 0)
            this.l_EmployeeModelentity.RowCount = 0;
        }
        , (error) => {
          this.statusMessage = "Problem with Employee Service, please try after some time";
          console.error(error);
        });  
  }


}
