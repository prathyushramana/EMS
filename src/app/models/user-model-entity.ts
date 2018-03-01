
import { BaseModelentity } from './base-model-entity';

export class LoginModelentity {
    UserName:string;
    Password:string;
    ConfPassword: string;  
    OldPassword:string;
    EmpGuid: number;
    constructor(){        
    }
}


export class UserRoleModelentity extends BaseModelentity{

    UserRoleGuid:number;
    UserGuid: number;
    RoleCode: string;
    IsActive: boolean;

    constructor(){
        super();
    }
}

export class UserInfoModelentity {
    EmpGuid: number;
    UserDisplayName: string;
    EmployeeTypeId: number;
    IsDefaultPasswordSet: boolean;
    IsUserProfileCompleted: boolean;
    UserAppRoles: string[];
    EmployeeId:string;
    EmployeeType:string;
    Email:string;
    ManagerName:string;
    TimesheetAprovGuid:number;
    AuthorizationToken:string;
    
    constructor(){
        this.IsUserProfileCompleted=false;
        this.IsDefaultPasswordSet=false;
    }
}
