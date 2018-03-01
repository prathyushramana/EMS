import {FormName} from '../shared/utility/constant';

export class ValidationModelEntity{
    Name: FormName;
    ValidationRulesCollection:ValidationRule[];    
}


export class ValidationRule{
    PropName:string;
    DisplayNmae:string;
    IsRequired:boolean;
    MaxLength:number;
    Minlength:number;
    RegExpresion;
    InValidInputVal:string[];
    IsRequiredOnCondition:boolean;
    DependentPropname: string;
    DependentPropValue:string[];
}