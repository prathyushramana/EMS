import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';


import { LookupService } from '../../../shared/lookup.service';
import { EmployeeService } from '../../../shared/employee.service';

import { FormName } from '../../../shared/utility/constant';
import { ValidationService } from '../../../shared/validation.service';

import { LookUpModelEntity } from '../../../models/lookup-model-entity';
import { AppRoleModelEntity } from '../../../models/app-role-model-entity';
import { SupervisorModelEntity } from '../../../models/supervisor-model-entity';
import { EmployeeModelentity } from '../../../models/employee-model-entity';
import { UserRoleModelentity } from '../../../models/user-model-entity';
import { TimesheetAprovModelEntity } from '../../../models/supervisor-model-entity';



import { ChangeStatus } from '../../../shared/utility/constant';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
  animations: [routerTransition()]
})
export class EmployeeDetailComponent implements OnInit {
  timeSheetApproverId: number = 0;
  timesheetAprovModelEntityCollection: TimesheetAprovModelEntity[]; 
  userInfo: any;
  public isCollapsed = false;
  all_lookUpValueCollection: LookUpModelEntity[];
  roles_lookUpValueCollection: LookUpModelEntity[];
  dept_lookupValueCollection: LookUpModelEntity[];
  emp_Type_lookupValueCollection: LookUpModelEntity[];
  l_AppRoleModelEntity: AppRoleModelEntity[];
  l_SupervisorModelEntity: SupervisorModelEntity[];
  statusMessage: string = "Loading....Please wait..";
  viewProject: boolean = false;
  componentName: string = "Employee";
  projHeader: string = "Show Project Details";

  validationMsg: string[];
  showErrorDetails: boolean = false;

  l_EmployeeModelentity: EmployeeModelentity = new EmployeeModelentity();
  l_UserRoleModelentityCollection: UserRoleModelentity[];

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};


  constructor(
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _lookUpService: LookupService,
    private _employeeService: EmployeeService,
    private _validationService: ValidationService
  ) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    this._lookUpService.getTimesheetAprovCollection()
    .subscribe((timesheetAprovList) => {
      this.timesheetAprovModelEntityCollection = timesheetAprovList;
      this.timeSheetApproverId = this.userInfo.TimesheetAprovGuid;
    });

    this._lookUpService.getLookUpValueCollection()
      .subscribe((lookupList) => {
        this.all_lookUpValueCollection = lookupList;
        this.emp_Type_lookupValueCollection = this.all_lookUpValueCollection.filter((elm: LookUpModelEntity) => elm.LookUpGroupName === "employee_type");
        this.dept_lookupValueCollection = this.all_lookUpValueCollection.filter((elm: LookUpModelEntity) => elm.LookUpGroupName === "department");
        this.roles_lookUpValueCollection = this.all_lookUpValueCollection.filter((elm: LookUpModelEntity) => elm.LookUpGroupName === "role");
      }
      , (error) => {
        this.statusMessage = "Problem with Lookup Service, please try after some time";
        console.error(error);
      });


    this._lookUpService.getAppRoleCollection()
      .subscribe((appRoleList) => {
        this.l_AppRoleModelEntity = appRoleList;

        let l_appRoleList: { id: number, itemName: string }[] = new Array();
        for (let i: number = 0; i < this.l_AppRoleModelEntity.length; i++) {
          let apRole = {
            id: this.l_AppRoleModelEntity[i].RoleGuid,
            itemName: this.l_AppRoleModelEntity[i].Description
          }
          l_appRoleList.push(apRole);
        }
        this.dropdownList = l_appRoleList;
      }
      , (error) => {
        this.statusMessage = "Problem with Lookup Service, please try after some time";
        console.error(error);
      });


    this._lookUpService.getSupervisorCollection()
      .subscribe((supervisorList) => {
        this.l_SupervisorModelEntity = supervisorList;
      }
      , (error) => {
        this.statusMessage = "Problem with Lookup Service, please try after some time";
        console.error(error);
      });

    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Application Roles",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };

    //Employee edit details
    let empCode: number = this._activateRoute.snapshot.params['EmpGuid'];
    if (empCode != undefined || empCode != null) {
      this._employeeService.getEmployeeDetails(empCode)
        .subscribe((empDetails) => {
          this.l_EmployeeModelentity = empDetails;
          this.SetAppRoleSelectListFromString();
          console.log(this.l_EmployeeModelentity);
        },
        (error) => {
          this.statusMessage = "Problem with Employee Service, please try after some time";
          console.error(error);
        });
    }
  }

  onItemSelect(item: any) {
    //console.log(item);
    //console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    //console.log(item);
    //console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    //console.log(items);
  }
  onDeSelectAll(items: any) {
    // console.log(items);
  }

  SubmitEmployeeDetails(): void {
    this.SetApplicationRoleInStringFormat();

    if (this.validateFormInput()) {

      if (!this.l_EmployeeModelentity.EmpGuid) {
        this.l_EmployeeModelentity.ActionChangeStatus = ChangeStatus.StatusInsert.toString();
        this.l_EmployeeModelentity.IsActive = true;
      }
      else
        this.l_EmployeeModelentity.ActionChangeStatus = ChangeStatus.StatusUpdate.toString();

      this._employeeService.saveEmployeeDetails(this.l_EmployeeModelentity)
        .subscribe((employeeSummary) => {
          let l_SummaryMessage: string = 'Please find the summary of the changes below: \n'
            + 'Employee ID:' + employeeSummary.EmpId + '\n'
            + 'Primary Email: ' + employeeSummary.PrimaryEmail + '\n'
            + 'User Name: ' + employeeSummary.UserName + '\n'
            + 'Importent Message: ' + employeeSummary.MessageString
          alert(l_SummaryMessage);
          this._router.navigate(['/employee']);
        },
        (error) => {
          this.statusMessage = "Problem with Employee Service, please try after some time";
          console.error(error);
        });

    }
  }

  SetApplicationRoleInStringFormat(): void {
    if (this.selectedItems) {
      this.l_EmployeeModelentity.AppAccessRoles = "";
      this.selectedItems.forEach(apRole => {
        if (apRole.itemName != "")
          this.l_EmployeeModelentity.AppAccessRoles = this.l_EmployeeModelentity.AppAccessRoles + apRole.id + "-";
      });
      this.l_EmployeeModelentity.AppAccessRoles = this.l_EmployeeModelentity.AppAccessRoles.slice(0, this.l_EmployeeModelentity.AppAccessRoles.lastIndexOf("-"));
    }
  }

  SetAppRoleSelectListFromString(): void {
    if (this.l_EmployeeModelentity.AppAccessRoles != null || this.l_EmployeeModelentity.AppAccessRoles != "") {
      let l_SelectedRole: string[] = this.l_EmployeeModelentity.AppAccessRoles.split("-");

      let l_appRoleList: { id: number, itemName: string }[] = new Array();
      for (let i: number = 0; i < l_SelectedRole.length; i++) {
        let l_AppRoleAccess: AppRoleModelEntity = new AppRoleModelEntity();
        l_AppRoleAccess = this.l_AppRoleModelEntity.find((elm: AppRoleModelEntity) => elm.RoleGuid.toString() == l_SelectedRole[i]);
        let apRole = {
          id: l_AppRoleAccess.RoleGuid,
          itemName: l_AppRoleAccess.Description
        }
        l_appRoleList.push(apRole);
      }
      this.selectedItems = l_appRoleList;

    }
  }

  ViewProject(): void {
    if (this.viewProject) {
      this.viewProject = false;
      this.projHeader = "Show Project Details";
    } else {
      this.viewProject = true;
      this.projHeader = "Hide Project Details";
    }
  }
  allocationModifiedEvent(isModified: boolean) {
    // No Implementaion.
  }

  validateFormInput(): boolean {
    this.validationMsg = [];
    this.showErrorDetails = false;
    this.validationMsg = this._validationService.IsValid(FormName.employee, this.l_EmployeeModelentity);
    if (this.validationMsg.length > 0) {
      this.showErrorDetails = true;
      return false;
    }
    else
      return true;
  }

  createNewEmployee() {
    this._router.navigate(['employee/']);
  }

}
