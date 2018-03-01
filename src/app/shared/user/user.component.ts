import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../shared/employee.service';
import { UserService } from '../../shared/user.service';
import { EmployeeModelentity } from '../../models/employee-model-entity';
import { ChangeStatus } from '../../shared/utility/constant';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  employeeModelentity: EmployeeModelentity = new EmployeeModelentity();
  statusMessage: string = "Loading....Please wait..";
  l_IsProfileCompleted: boolean;

  constructor(private _employeeService: EmployeeService
    , private _userService: UserService) { }

  ngOnInit() {

    let l_empGuid: number = JSON.parse(localStorage.getItem("UserInfo")).EmpGuid;
    this.l_IsProfileCompleted = JSON.parse(localStorage.getItem("UserInfo")).IsUserProfileCompleted;
    //Load logged in user details...
    this._employeeService.getEmployeeDetails(l_empGuid)
      .subscribe((empDetails) => {
        this.employeeModelentity = empDetails;
      },
      (error) => {
        this.statusMessage = "Problem with Employee Service, please try after some time";
        console.error(error);
      });
  }

  SaveUserDetails(): void {
    let l_FirstTimeMessgae: string = "";
    if (!this.l_IsProfileCompleted)
      l_FirstTimeMessgae = "/n This is the first time you have update your profile informations. /n Applications will log out automatically."
    //Validations check to be added, if valid then submit
    this.employeeModelentity.ActionChangeStatus = ChangeStatus.StatusUpdate.toString();
    this.employeeModelentity.IsEmployeeProfilChanges = true;
    this._employeeService.saveEmployeeDetails(this.employeeModelentity)
      .subscribe((employeeSummary) => {
        alert(employeeSummary.MessageString+l_FirstTimeMessgae);
        if(l_FirstTimeMessgae!=""){        
         this._userService.logout();
        }
      },
      (error) => {
        this.statusMessage = "Problem with Employee Service, please try after some time";
        console.error(error);
      });
  }

}
