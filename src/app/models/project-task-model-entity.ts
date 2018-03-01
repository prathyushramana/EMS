import { BaseModelentity } from './base-model-entity';

export class ProjectModelEntity extends BaseModelentity {
    ProjectGuid: Number;
    CutomerGuid: Number;
    Name: string;
    ProjectTypeGuid: Number;
    StartDate: Date;
    EndDate: Date;
    ProjectAnchorName: string;
    IsActive: boolean;

    //For Grid Display 
    CustomerName: string;
    ProjectType: string;

    constructor() {
        super();
        this.CutomerGuid = 0;
        this.Name = "";
        this.ProjectTypeGuid = 0;
    }
}

export class ProjectCacheEntity {
    ProjectGuid: number;
    Name: string;
    ProjectType: string;
    IsActive: boolean;
}

export class TaskModelEntity extends BaseModelentity {
    TaskGuid: Number;
    ProjectGuid: Number;
    TaskName: string;
    TaskTypeGuid: Number;
    StartDate: Date;
    EndDate: Date;
    IsBillable: boolean;
    IsActive: boolean;

    //For Grid Display 
    ProjectName: string;
    ProjectStatus: string;
    TaskType: string;
    ProjectType: string;
    ManagerName:string;
    ClientName:string;

    //For timesheet task selection
    IsSelected:boolean;
    DisableSelection: boolean;

    constructor() {
        super();
        this.TaskTypeGuid = 0;
    }
}
export class EmployeeProjectRefEntity extends BaseModelentity {
    EmpProjRefGuid: number;
    EmpGuid: number;
    ProjGuid: number;
    FromDate: Date;
    ToDate: Date;
    IsActive: boolean;

    //Display Only
    EmployeeName:string;
    EmpRole:string;
}

export class EmpProjMapping{
    MappingString:string;
    ProjGuid: number;
    constructor() {}
}

export class EmpProjMappingViewEntity{
     EmpProjRefGuid:number; 
     EmpGuid: number;      
     ProjectGuid: number;      
     EmpName: string      
     EmpId: string;      
     EmpRole: string;      
     EmpType: string;      
     ProjectName:string;       
     ProjectType:string;       
     ProjectManager:string;       
     Customer: string;       
     FromDate: Date;       
     ToDate: Date;       
     IsActive: boolean;
     Version: number;
}