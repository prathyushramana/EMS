import { Component, OnInit,Output,EventEmitter } from '@angular/core';

import { UserService } from '../user.service';
import { LookupService } from '../lookup.service';
import { LoginModelentity } from '../../models/user-model-entity';
import { TimesheetAprovModelEntity } from '../../models/supervisor-model-entity';

@Component({
  selector: 'app-timesheet-approver',
  templateUrl: './timesheet-approver.component.html',
  styleUrls: ['./timesheet-approver.component.scss']
})
export class TimesheetApproverComponent implements OnInit {

  statusMessage: string = "Please wait....";
  timeSheetApproverId: number = 0;
  timesheetAprovModelEntityCollection: TimesheetAprovModelEntity[]; 
  userInfo: any;
  isError:boolean=false;

  constructor(private _userService: UserService
    , private _lookUpService: LookupService) { }

    @Output("onApproverModified")
    onApproverModified: EventEmitter<boolean>=new EventEmitter<boolean>();    

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    this._lookUpService.getTimesheetAprovCollection()
    .subscribe((timesheetAprovList) => {
      this.timesheetAprovModelEntityCollection = timesheetAprovList;
      this.timeSheetApproverId = this.userInfo.TimesheetAprovGuid;
    }
    , (error) => {
      this.isError=true;
      this.statusMessage = "Problem with Lookup Service, please try after some time";
      console.error(error);
    });
  }

  saveTimesheetApprover(): void {
    if (this.timeSheetApproverId != 0) {
      this._userService.updateTimehseetApprover(this.timeSheetApproverId, this.userInfo.EmpGuid)
        .subscribe((respndsString) => {
          this.statusMessage = respndsString;
          if (this.statusMessage != "") {
            this.isError = true;
          } else {
            // Update the below sctions with modal window insteded of alert window
            this.userInfo.TimesheetAprovGuid=this.timeSheetApproverId;
            localStorage.removeItem("UserInfo");
            localStorage.setItem("UserInfo",JSON.stringify(this.userInfo));
            alert("Timesheet approver update successfully.");
            this.onApproverModified.emit(true);
          }
        }
        , (error) => {
          this.statusMessage = "Problem with User Service, please try after some time";
          this.isError = true;
          this.onApproverModified.emit(false);
          console.error(error);
        });
    } else {
      alert("Please select timesheet approver from the list.");
      this.onApproverModified.emit(false);
    }
  }

}
