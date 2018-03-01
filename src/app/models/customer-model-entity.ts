import { BaseModelentity } from './base-model-entity';

export class CustomerModelentity extends BaseModelentity{

    CutomerGuid:number;
    CustomerName:string;
    CustomerDomainGuid:number;
    OfficePhoneNumber:string;
    Website:string;
    IsActive:boolean;
    Address1: string;
    Address2: string;
    City: string;
    State: string
    Country: string
    Zip: string

    // For Grid Display 
    LineOfBusiness:string;

    constructor() {
        super();
        this.CustomerDomainGuid =0;
        this.CustomerName = "";        
    }

}

export class CustomerCacheEntity{
    CustGuid: number;
    Name:string;
}
