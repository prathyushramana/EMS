import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

import { BaseSerice } from './base.service';

import { ProjectModelEntity, TaskModelEntity,EmployeeProjectRefEntity
      ,EmpProjMapping,EmpProjMappingViewEntity } from '../models/project-task-model-entity';

@Injectable()
export class ProjectTaskService extends BaseSerice {


  constructor(private _http: Http,private _datePipe: DatePipe) { super(); }

  saveProjectDetails(argProjectModelEntity: ProjectModelEntity): Observable<string> {
    return this._http.post(this.getWebApiUrl() + "proj/SaveProjectDetails"
      , this.serializeModelObject(argProjectModelEntity)
      , this.getRequestOptionsWithToken())
      .map((response: Response) => response.json())
      .catch(function (error: Response) {
        console.error(error);
        return Observable.throw(error);
      });

  }

  getProjectCollection(argProjectModelEntity: ProjectModelEntity): Observable<ProjectModelEntity[]> {
    if (argProjectModelEntity.CutomerGuid == 0)
      argProjectModelEntity.CutomerGuid = null;

    if (argProjectModelEntity.ProjectTypeGuid == 0)
      argProjectModelEntity.ProjectTypeGuid = null;

    return this._http.post(this.getWebApiUrl() + "proj/GetProjectList"
      , this.serializeModelObject(argProjectModelEntity)
      , this.getRequestOptionsWithToken())
      .map((response: Response) => response.json())
      .catch(function (error: Response) {
        console.error(error);
        return Observable.throw(error);
      });
  }

  getProjectDetails(argProjGuid: number): Observable<ProjectModelEntity> {
    return this._http.get(this.getWebApiUrl() + "proj/GetProject/" + argProjGuid
  , this.getRequestOptionsWithToken())
      .map((response: Response) => response.json())
      .catch(function (error: Response) {
        console.error(error);
        return Observable.throw(error);
      });
  }

  saveTaskDetails(argTaskModelEntity: TaskModelEntity): Observable<string> {    
    return this._http.post(this.getWebApiUrl() + "proj/SaveTaskDetails"
      , this.serializeModelObject(argTaskModelEntity)
      , this.getRequestOptionsWithToken())
      .map((response: Response) => response.json())
      .catch(function (error: Response) {
        console.error(error);
        return Observable.throw(error);
      });

  }

  getTaskDetails(argTaskGuid: number): Observable<TaskModelEntity> {
    return this._http.get(this.getWebApiUrl() + "proj/GetTaskDetail/" + argTaskGuid
    , this.getRequestOptionsWithToken())
      .map((response: Response) => response.json())
      .catch(function (error: Response) {
        console.error(error);
        return Observable.throw(error);
      });
  }

  getTaskCollectionByProject(argProjGuid:number):Observable<TaskModelEntity[]>{
    return this._http.get(this.getWebApiUrl() + "proj/GetTaskListByProject/" + argProjGuid
    , this.getRequestOptionsWithToken())
    .map((response: Response) => response.json())
    .catch(function (error: Response) {
      console.error(error);
      return Observable.throw(error);
    });
  }

  saveProjectEmployeeMapping(argEmplProjRefCollection: EmployeeProjectRefEntity[],argProjGuid:number): Observable<string> {
    let l_EmpProjMapping:EmpProjMapping=new EmpProjMapping();
    l_EmpProjMapping.ProjGuid=argProjGuid;
    l_EmpProjMapping.MappingString=this.createEmpProjMappingStr(argEmplProjRefCollection);
    return this._http.post(this.getWebApiUrl() + "proj/SaveEmpProjectMapping"
      , this.serializeModelObject(l_EmpProjMapping)      
      , this.getRequestOptionsWithToken())
      .map((response: Response) => response.json())
      .catch(function (error: Response) {
        console.error(error);
        return Observable.throw(error);
      });

    }

    retrieveEmpProjMappingByEmployee(argEmployeeGuid:number):Observable<EmpProjMappingViewEntity[]>{
      return this._http.get(this.getWebApiUrl() + "proj/RetrieveEmpProjMappingByEmployee/" + argEmployeeGuid
      , this.getRequestOptionsWithToken())
      .map((response: Response) => response.json())
      .catch(function (error: Response) {
        console.error(error);
        return Observable.throw(error);
      });
    }

    retrieveEmpProjMappingByProject(argProjectGuid:number):Observable<EmpProjMappingViewEntity[]>{
      return this._http.get(this.getWebApiUrl() + "proj/RetrieveEmpProjMappingByProject/" + argProjectGuid
      , this.getRequestOptionsWithToken())
      .map((response: Response) => response.json())
      .catch(function (error: Response) {
        console.error(error);
        return Observable.throw(error);
      });
    }


    private createEmpProjMappingStr(argEmplProjRefCollection: EmployeeProjectRefEntity[]):string{
      let l_MappingStrCollection="";
      argEmplProjRefCollection.forEach((map:EmployeeProjectRefEntity)=>{
        let l_MappingStr:string="";
        l_MappingStr=map.EmpProjRefGuid+"~"+map.EmpGuid+"~"+map.ProjGuid+"~"+this._datePipe.transform(map.FromDate,"MM/dd/yyyy")
                    +"~"+this._datePipe.transform(map.ToDate,"MM/dd/yyyy")+"~"+map.IsActive+'~'+map.ActionChangeStatus+'~'+map.Version;
                    l_MappingStrCollection=l_MappingStrCollection+l_MappingStr+"|";
      });
      return  l_MappingStrCollection.substring(0, l_MappingStrCollection.length - 1);

    }

}
