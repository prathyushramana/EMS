import { BaseModelentity } from './base-model-entity';



export class EmployeeModelentity extends BaseModelentity {

    EmpGuid: number;
    EmpId: string;
    FirstName: string;
    LastName: string;
    MiddleName: string;
    Gender: string;
    EmployeeTypeId: number;
    DateOfJoining: Date;
    DepartmentId: number;
    IsManager: boolean;
    ManagerEmpGuid: number;
    RoleId: number;
    Email: string;
    IsActive:boolean;
    IsTimesheetApprover:boolean;
    TimesheetAprovGuid:number;
    AppAccessRoles: string;  
    /* User profile/personal information */
    Address1: string;
    Address2: string;
    City: string;
    State: string
    Country: string
    Zip: string
    PhoneNumber: string
    DateOfBirth: Date
    IsEmployeeProfilChanges: boolean;

    /*For Employee List Display Purpouses only */
    FullName: string;
    EmployeeType: string;
    Department: string;
    ManagerName: string;
    DOJ: string;
    Role: string;

        /*For Employee Search filter attribute*/
        RowCount: number;
        StartIndex: number;
        TerminalIndex: number;

    /* For multiselect pourpouses only */
    IsSelected: boolean;

    constructor() {
        super();
        this.Gender = "default";
        this.EmployeeTypeId = 0;
        this.DepartmentId = 0;
        this.ManagerEmpGuid = 0;
        this.RoleId = 0;

    }
}

export class EmployeeSummaryEntity extends BaseModelentity {
    EmpId: string;
    UserName: string;
    MessageString: string;
    PrimaryEmail: string;

    constructor() {
        super();
    }
}
