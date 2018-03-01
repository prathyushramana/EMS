import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

import { BaseSerice } from './base.service';
import { LookUpModelEntity } from '../models/lookup-model-entity';
import { AppRoleModelEntity } from '../models/app-role-model-entity';
import { SupervisorModelEntity,TimesheetAprovModelEntity } from '../models/supervisor-model-entity';
import { CustomerCacheEntity } from '../models/customer-model-entity';
import { ProjectCacheEntity } from '../models/project-task-model-entity'; 

@Injectable()
export class LookupService extends BaseSerice {

    constructor(private _http: Http) { super(); }

    getLookUpValueCollection(): Observable<LookUpModelEntity[]> {
        return this._http.get(this.getWebApiUrl()+ "lookup/GetLookUpCollection"
        ,this.getRequestOptionsWithToken())
            .map(function (response: Response) {
                let lookUpArry: LookUpModelEntity[] = new Array<LookUpModelEntity>();
                for (var i = 0; i < response.json().length; i++) {
                    let lookUpEntity: LookUpModelEntity = new LookUpModelEntity();
                    lookUpEntity.LookUpGuid = response.json()[i].LookUpGuid;
                    lookUpEntity.Description = response.json()[i].Description;
                    lookUpEntity.LookUpGroupName = response.json()[i].LookUpGroupName;
                    lookUpArry.push(lookUpEntity);
                }
                return lookUpArry;
            })
            .catch(function (error: Response) {
                console.error(error);
                return Observable.throw(error);
            });
    }

    retrieveLookUpValueByName(argLookUpName:string):Observable<LookUpModelEntity[]>{
        return this._http.get(this.getWebApiUrl()+ "lookup/GetLookUpValueCollection/"+argLookUpName
        ,this.getRequestOptionsWithToken())
        .map(function (response: Response) {
            let lookUpArry: LookUpModelEntity[] = new Array<LookUpModelEntity>();
            for (var i = 0; i < response.json().length; i++) {
                let lookUpEntity: LookUpModelEntity = new LookUpModelEntity();
                lookUpEntity.LookUpGuid = response.json()[i].LookUpGuid;
                lookUpEntity.Description = response.json()[i].Description;
                lookUpEntity.LookUpGroupName = response.json()[i].LookUpGroupName;
                lookUpArry.push(lookUpEntity);
            }
            return lookUpArry;
        })
        .catch(function (error: Response) {
            console.error(error);
            return Observable.throw(error);
        });
    }

    getAppRoleCollection(): Observable<AppRoleModelEntity[]> {
        return this._http.get(this.getWebApiUrl()+ "lookup/GetAppRoleCollection"
        ,this.getRequestOptionsWithToken())
            .map(function (response: Response) {
                let appRoleArray: AppRoleModelEntity[] = new Array<AppRoleModelEntity>();
                for (var i = 0; i < response.json().length; i++) {
                    let appRoleEntity: AppRoleModelEntity = new AppRoleModelEntity();
                    appRoleEntity.RoleGuid=response.json()[i].RoleGuid;
                    appRoleEntity.Name = response.json()[i].Name;
                    appRoleEntity.Description = response.json()[i].Description;
                    appRoleArray.push(appRoleEntity);
                }
                return appRoleArray;
            })
            .catch(function (error: Response) {
                console.error(error);
                return Observable.throw(error);
            });

    }

    getSupervisorCollection(): Observable<SupervisorModelEntity[]> {
        return this._http.get(this.getWebApiUrl()+ "lookup/GetSupervisorList"
        ,this.getRequestOptionsWithToken())
        .map(function (response: Response) {
            let appSupervisorArray: SupervisorModelEntity[] = new Array<SupervisorModelEntity>();
            for (var i = 0; i < response.json().length; i++) {
                let appSupervisorEntity: SupervisorModelEntity = new SupervisorModelEntity();
                appSupervisorEntity.UserManagerGuid = response.json()[i].UserManagerGuid;
                appSupervisorEntity.ManagerName = response.json()[i].ManagerName;
                appSupervisorArray.push(appSupervisorEntity);
            }
            return appSupervisorArray;
        })
        .catch(function (error: Response) {
            console.error(error);
            return Observable.throw(error);
        });
    }

    getCustomerCollection(): Observable<CustomerCacheEntity[]> {
        return this._http.get(this.getWebApiUrl()+ "lookup/GetCustomeCache"
        ,this.getRequestOptionsWithToken())
        .map(function (response: Response) {
            let customerCacheArray: CustomerCacheEntity[] = new Array<CustomerCacheEntity>();
            for (var i = 0; i < response.json().length; i++) {
                let customerCacheEntity: CustomerCacheEntity = new CustomerCacheEntity();
                customerCacheEntity.CustGuid = response.json()[i].CustGuid;
                customerCacheEntity.Name = response.json()[i].Name;
                customerCacheArray.push(customerCacheEntity);
            }
            return customerCacheArray;
        })
        .catch(function (error: Response) {
            console.error(error);
            return Observable.throw(error);
        });
    }

    getProjectCollection(): Observable<ProjectCacheEntity[]> {
        return this._http.get(this.getWebApiUrl()+ "lookup/GetProjectCache"
        ,this.getRequestOptionsWithToken())
        .map(function (response: Response) {
            let projectCacheArray: ProjectCacheEntity[] = new Array<ProjectCacheEntity>();
            for (var i = 0; i < response.json().length; i++) {
                let projectCacheEntity: ProjectCacheEntity = new ProjectCacheEntity();
                projectCacheEntity.ProjectGuid = response.json()[i].ProjectGuid;
                projectCacheEntity.Name = response.json()[i].Name;
                projectCacheEntity.ProjectType = response.json()[i].ProjectType;
                projectCacheEntity.IsActive = response.json()[i].IsActive;
                projectCacheArray.push(projectCacheEntity);
            }
            return projectCacheArray;
        })
        .catch(function (error: Response) {
            console.error(error);
            return Observable.throw(error);
        });
    }

    getTimesheetAprovCollection(): Observable<TimesheetAprovModelEntity[]> {
        return this._http.get(this.getWebApiUrl()+ "lookup/GetTimesheetApproverCache"
        ,this.getRequestOptionsWithToken())
        .map(function (response: Response) {
            let appTimesAprovArray: TimesheetAprovModelEntity[] = new Array<TimesheetAprovModelEntity>();
            for (var i = 0; i < response.json().length; i++) {
                let appTimesheetAprovModelEntity: TimesheetAprovModelEntity = new TimesheetAprovModelEntity();
                appTimesheetAprovModelEntity.ApproverGuid = response.json()[i].ApproverGuid;
                appTimesheetAprovModelEntity.ApproverName = response.json()[i].ApproverName;
                appTimesAprovArray.push(appTimesheetAprovModelEntity);
            }
            return appTimesAprovArray;
        })
        .catch(function (error: Response) {
            console.error(error);
            return Observable.throw(error);
        });
    }

}
