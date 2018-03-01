import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

import { BaseSerice } from './base.service';
import { EmployeeModelentity,EmployeeSummaryEntity } from '../models/employee-model-entity';
import { UserRoleModelentity } from '../models/user-model-entity';



@Injectable()
export class EmployeeService extends BaseSerice {

  constructor(private _http: Http) { super(); }

  saveEmployeeDetails(argEmployeeModelentity: EmployeeModelentity): Observable<EmployeeSummaryEntity> {
    return this._http.post(this.getWebApiUrl()+ "employee/SaveEmployeeDetails"
      ,this.serializeModelObject(argEmployeeModelentity)      
      , this.getRequestOptionsWithToken())
      .map(function (response: Response) {
        let l_EmpSummary: EmployeeSummaryEntity=new EmployeeSummaryEntity();
        l_EmpSummary.EmpId=response.json().EmpId;
        l_EmpSummary.UserName=response.json().UserName;
        l_EmpSummary.PrimaryEmail=response.json().PrimaryEmail;       
        l_EmpSummary.MessageString=response.json().MessageString;
        return l_EmpSummary;
      })
      .catch(function (error: Response) {
        console.error(error);
        return Observable.throw(error);
      });
      
  }

  getEmployeeCollection(argEmployeeModelentity: EmployeeModelentity): Observable<EmployeeModelentity[]>{
    return this.getResourceList(argEmployeeModelentity);
  }

  getEmployeeDetails(argEmpGuid:number): Observable<EmployeeModelentity>{
    return this._http.get(this.getWebApiUrl()+ "employee/GetEmployeeDetails/"+argEmpGuid
    , this.getRequestOptionsWithToken())
    .map((response: Response)=> response.json())
    .catch(function (error: Response) {
      console.error(error);
      return Observable.throw(error);
  });
  }

  getResourceList(argEmployeeModelentity: EmployeeModelentity): Observable<EmployeeModelentity[]> {  
    return this._http.post(this.getWebApiUrl() + "employee/GetEmployeeColection"
      , this.serializeModelObject(argEmployeeModelentity)
      , this.getRequestOptionsWithToken())
      .map((response: Response) => response.json())
      .catch(function (error: Response) {
        console.error(error);
        return Observable.throw(error);
      });
  }

  getEmployeeCount(argEmployeeModelentity: EmployeeModelentity): Observable<number> {  
    return this._http.post(this.getWebApiUrl() + "employee/GetEmployeeCount"
      , this.serializeModelObject(argEmployeeModelentity)
      , this.getRequestOptionsWithToken())
      .map((response: Response) => response.json())
      .catch(function (error: Response) {
        console.error(error);
        return Observable.throw(error);
      });
  }

}
