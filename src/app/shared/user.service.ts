import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import 'rxjs/add/operator/toPromise';

import { BaseSerice } from './base.service';
import { LoginModelentity, UserInfoModelentity } from '../models/user-model-entity';
import { fail } from 'assert';

@Injectable()
export class UserService extends BaseSerice {

  constructor(private _http: Http
    , private _router: Router
  ) { super();}

  private loggedIn = new BehaviorSubject<boolean>(null);
  private loginUserDisplayName=new BehaviorSubject<string>("");
  private userInfoModelentity=new BehaviorSubject<UserInfoModelentity>(new UserInfoModelentity());
  private isProfileCompleted =new BehaviorSubject<boolean>(false);
 
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get UserDisplayName()
  {
    return this.loginUserDisplayName.asObservable();
  }

  get UserInfoModelentity(){
    return this.userInfoModelentity.asObservable();
  }

  get IsProfileCompleted()
  {
    return this.isProfileCompleted.asObservable();
  }

  SetDisplayName(value:string) {
    this.loginUserDisplayName.next(value);
  }

  SetUserInfoModelentity(argUserInfo){
    this.userInfoModelentity.next(argUserInfo);
  }
  
 SetProfileCompleted(value:boolean){
    this.isProfileCompleted.next(value);
  }

  login(user: LoginModelentity): Promise<UserInfoModelentity> {
    if (user.UserName !== '' && user.Password != '') {
      return this._http.post(this.getWebApiUrl()+ "user/AuthenticateUser"
        , this.serializeModelObject(user)
        , this.getRequestOptions())
        .map(function (response: Response) {
          if (response.json().UserDisplayName != "") {
            let l_userInfoDetails: UserInfoModelentity = new UserInfoModelentity();
            l_userInfoDetails.EmpGuid=response.json().EmpGuid;
            l_userInfoDetails.UserDisplayName = response.json().UserDisplayName;
            l_userInfoDetails.EmployeeTypeId = response.json().EmployeeTypeId;
            l_userInfoDetails.IsDefaultPasswordSet = response.json().IsDefaultPasswordSet;            
            l_userInfoDetails.IsUserProfileCompleted = response.json().IsUserProfileCompleted;
            l_userInfoDetails.UserAppRoles = response.json().UserAppRoles.toString().split("-");
            l_userInfoDetails.EmployeeId = response.json().EmployeeId;
            l_userInfoDetails.EmployeeType = response.json().EmployeeType;
            l_userInfoDetails.Email = response.json().Email;
            l_userInfoDetails.ManagerName = response.json().ManagerName;
            l_userInfoDetails.TimesheetAprovGuid = response.json().TimesheetAprovGuid;
            l_userInfoDetails.AuthorizationToken=response.json().AuthorizationToken;                                                  
            return l_userInfoDetails;
          }
          else
          return null;
        }).toPromise<UserInfoModelentity>()
        .catch(function (error: Response) {
          console.error(error);
          throw (error);
        });      
    }
  }

  PostValidation(): void {
    //If Validations is successful
    this.loggedIn.next(true);
    this._router.navigate(['/']);

  }

  logout() {
    this.disolveToken()
    .subscribe((res)=>{
      this.loggedIn.next(false);
      this.loginUserDisplayName.next("");
      this.userInfoModelentity.next(new UserInfoModelentity());
      this.isProfileCompleted.next(false);
      this._router.navigate(['/login']);
      localStorage.clear();    
    });
 
  }

  updatePassword(argLoginModelentity: LoginModelentity): Observable<string> {
    return this._http.post(this.getWebApiUrl()+ "user/UpdatePassword"
      ,this.serializeModelObject(argLoginModelentity)      
      , this.getRequestOptionsWithToken())
      .map( (response: Response)=> response.json())
      .catch(function (error: Response) {
        console.error(error);
        return Observable.throw(error);
      });
      
  }

  updateTimehseetApprover(argTimesheetApproverGuid: number,argEmployeeGuid: number): Observable<string> {
    let l_UserInfoModelentity:UserInfoModelentity=new UserInfoModelentity();
    l_UserInfoModelentity.EmpGuid=argEmployeeGuid;
    l_UserInfoModelentity.TimesheetAprovGuid=argTimesheetApproverGuid;
    return this._http.post(this.getWebApiUrl()+ "user/UpdateTimesheetAprov"
      ,this.serializeModelObject(l_UserInfoModelentity)      
      , this.getRequestOptionsWithToken())
      .map( (response: Response)=> response.json())
      .catch(function (error: Response) {
        console.error(error);
        return Observable.throw(error);
      });
      
  }

  private disolveToken(): Observable<string>{
    return this._http.get(this.getWebApiUrl()+ "user/AppLogOut/"+this.getCurrentToken()
    ,this.getRequestOptionsWithToken())
    .map((response: Response) => response.json())
    .catch(function (error: Response) {
      console.error(error);
      return Observable.throw(error);
    }); 
  }

}
