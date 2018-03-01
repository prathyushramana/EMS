import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

import { ProjectTaskService } from '../project-task.service';
import { EmpProjMappingViewEntity, EmployeeProjectRefEntity } from '../../models/project-task-model-entity';
import { ChangeStatus } from '../utility/constant';


@Component({
  selector: 'app-emp-proj',
  templateUrl: './emp-proj.component.html',
  styleUrls: ['./emp-proj.component.scss']
})
export class EmpProjComponent implements OnInit {

  private statusMessage: string = "Loading....Please wait..";
  private empProjMappingViewEntityCollection: Array<EmpProjMappingViewEntity> = [];
  private employeeProjectRefEntityCollection: Array<EmployeeProjectRefEntity>;
  private isEmployeeView: boolean;
  private isProjectView: boolean;
  private flagResetMap: Map<number, boolean>;
  private showMessage: boolean;
  private showDefaultClass = "alert alert-info";


  constructor(private _projTaskService: ProjectTaskService) { }

  @Input("InputGuid")
  intputGuid: number;

  @Input("Region")
  regionName: string;

  @Output()
  onMappingModified: EventEmitter<boolean>=new EventEmitter<boolean>();

  ngOnInit() {
    // Component Called from the Project Details Module  
    if (this.regionName == "Project") {
      this.isProjectView = true;
      this.isEmployeeView = false;
      this._projTaskService.retrieveEmpProjMappingByProject(this.intputGuid)
        .subscribe((empProjMapList) => {
          this.empProjMappingViewEntityCollection = empProjMapList;
        }
        , (error) => {
          this.statusMessage = "Problem with Project-Task Service, please try after some time";
          console.error(error);
        });
    } else if (this.regionName == "Employee") {
      this.isProjectView = false;
      this.isEmployeeView = true;

      this._projTaskService.retrieveEmpProjMappingByEmployee(this.intputGuid)
        .subscribe((empProjMapList) => {
          this.empProjMappingViewEntityCollection = empProjMapList;
        }
        , (error) => {
          this.statusMessage = "Problem with Project-Task Service, please try after some time";
          console.error(error);
        });
    }

  }

  private getAlertClass(): string {
    return this.showDefaultClass;
  }

  private allocationModified(evnt, mapping: EmpProjMappingViewEntity) {
    this.showMessage = false;
    if (this.flagResetMap == undefined)
      this.flagResetMap = new Map<number, boolean>();
    if (this.flagResetMap.has(mapping.EmpProjRefGuid))
      this.flagResetMap.delete(mapping.EmpProjRefGuid);
    else
      this.flagResetMap.set(mapping.EmpProjRefGuid, evnt);
  }

  private SaveMapping() {
    this.showMessage = true;
    if (this.flagResetMap == undefined) {
      this.showDefaultClass = "alert alert-warning";
      this.statusMessage = "No modification has been made to be persisted for the project allocations.";
      this.onMappingModified.emit(false);
    }else{
      if (this.employeeProjectRefEntityCollection == undefined)
        this.employeeProjectRefEntityCollection = [];
      this.flagResetMap.forEach((empProjRefGuid, key) => {
        let empProjMappingViewEntity: EmpProjMappingViewEntity = this.empProjMappingViewEntityCollection
          .find((elm: EmpProjMappingViewEntity) =>
            elm.EmpProjRefGuid == key);
        let employeeProjectRefEntity: EmployeeProjectRefEntity = new EmployeeProjectRefEntity();
        employeeProjectRefEntity.ActionChangeStatus = ChangeStatus.StatusUpdate.toString();
        employeeProjectRefEntity.Version = empProjMappingViewEntity.Version;
        employeeProjectRefEntity.ProjGuid = empProjMappingViewEntity.ProjectGuid;
        employeeProjectRefEntity.EmpGuid = empProjMappingViewEntity.EmpGuid;
        employeeProjectRefEntity.EmpProjRefGuid = empProjMappingViewEntity.EmpProjRefGuid;
        employeeProjectRefEntity.FromDate = empProjMappingViewEntity.FromDate;
        employeeProjectRefEntity.ToDate = empProjMappingViewEntity.ToDate;
        employeeProjectRefEntity.IsActive = empProjMappingViewEntity.IsActive;
        this.employeeProjectRefEntityCollection.push(employeeProjectRefEntity);
      });

      if (this.employeeProjectRefEntityCollection.length > 0) {
        this._projTaskService.saveProjectEmployeeMapping(this.employeeProjectRefEntityCollection, this.intputGuid)
          .subscribe((resMsg) => {
            if (resMsg === "") {
              this.showDefaultClass = "alert alert-success";
              this.statusMessage = "Allocations have been update successfully";
              setTimeout(()=>{this.onMappingModified.emit(true)},2000);              
            } else {
              this.showDefaultClass = "alert alert-danger";
              this.statusMessage = resMsg;
              this.onMappingModified.emit(false);
            }
          }
          , (error) => {
            this.showDefaultClass = "alert alert-danger";
            this.statusMessage = "Problem with Project-Task Service, please try after some time";
            this.onMappingModified.emit(false);
            console.error(error);
          });
      } else {
        this.showDefaultClass = "alert alert-warning";
        this.statusMessage = "No modification has been made to be persisted for the project allocations.";
        this.onMappingModified.emit(false);
      }
    }

  }

}
