import { Injectable } from '@angular/core';

import { FormName } from '../shared/utility/constant';
import { ValidationModelEntity, ValidationRule } from '../models/validation-config-model-entity';

@Injectable()
export class ValidationService {

  private appValidationRules: ValidationModelEntity[];

  constructor() {
    this.appValidationRules = [];
    this.appValidationRules.push(this.LoadLogInFormValidation());
    this.appValidationRules.push(this.EmployeeFormvalidation());
        
  }

 

  public IsValid(argFormName: FormName, argModelObject: any): string[] {
    let l_Message: string[] = [];
    let l_frmValidationRules: ValidationModelEntity = this.appValidationRules.find((elm: ValidationModelEntity) => elm.Name == argFormName);
    //if (Object.keys(argModelObject).length === 0) {
    l_frmValidationRules.ValidationRulesCollection.forEach((elm: ValidationRule) => {
      let l_PropMessage: string[] = [];
      let value = argModelObject[elm.PropName];
     
      //Required
      if (elm.IsRequired && (value == undefined || value == null|| value==""))
        l_PropMessage.push(elm.DisplayNmae + " is required.");
      else{             
        //For cheing the look up values bind to a guid
        if(!Number.isNaN(value)){
          if (elm.IsRequired && value ==0)
          l_PropMessage.push(elm.DisplayNmae + " is required.");
        }
      }
    

      if (l_PropMessage.length == 0) {
        //Min-Length
        if ((elm.Minlength != undefined || elm.Minlength != null)
          && value.length < elm.Minlength)
          l_PropMessage.push(elm.DisplayNmae + " length must be greater than or equal to " + elm.Minlength + ".");

        //MaxLength
        if ((elm.MaxLength != undefined || elm.MaxLength != null)
          && value.length > elm.MaxLength)
          l_PropMessage.push(elm.DisplayNmae + " length must be less than or equal to " + elm.MaxLength + ".");

        //Invalid value
        if(((elm.InValidInputVal!=undefined || elm.InValidInputVal!=null) && elm.InValidInputVal.length)
          && elm.InValidInputVal.indexOf(value)!=-1)
          l_PropMessage.push(elm.DisplayNmae + " value is not a valid input.");

        //Regular Expresion validation
        if(elm.RegExpresion!=undefined || elm.RegExpresion!=null){
         let regexp = new RegExp(elm.RegExpresion);

         if(!regexp.test(value))
         l_PropMessage.push("Invalid "+elm.DisplayNmae+" value.");
         
        }  

      }

      if (l_PropMessage.length > 0) {
        l_PropMessage.forEach((elm: string) => {
          l_Message.push(elm);
        });
      }
    });    
    return l_Message;
  }

  /* All form validation configuration*/

  /*Log in form */
  private LoadLogInFormValidation(): ValidationModelEntity {
    let loginFrmEntity: ValidationModelEntity = new ValidationModelEntity();
    loginFrmEntity.Name = FormName.login;
    loginFrmEntity.ValidationRulesCollection = [];

    let username_rule: ValidationRule = new ValidationRule();
    username_rule.IsRequired = true;
    username_rule.DisplayNmae = "User Name";
    username_rule.MaxLength = 50;
    username_rule.Minlength = 5;
    username_rule.PropName = "UserName";
    loginFrmEntity.ValidationRulesCollection.push(username_rule);

    let password_rule: ValidationRule = new ValidationRule();
    password_rule.IsRequired = true;
    password_rule.DisplayNmae = "Password";
    password_rule.MaxLength = 20;
    password_rule.Minlength = 8;
    password_rule.PropName = "Password";
    loginFrmEntity.ValidationRulesCollection.push(password_rule);
    return loginFrmEntity;

  }

  /*Employee Form */
  private EmployeeFormvalidation(): ValidationModelEntity{
    let empFrmEntity: ValidationModelEntity = new ValidationModelEntity();
    empFrmEntity.Name = FormName.employee;
    empFrmEntity.ValidationRulesCollection = [];

    let fnmae_rule: ValidationRule = new ValidationRule();
    fnmae_rule.IsRequired = true;
    fnmae_rule.DisplayNmae = "First Name";
    fnmae_rule.MaxLength = 100;
    fnmae_rule.Minlength = 5;
    fnmae_rule.PropName = "FirstName";
    empFrmEntity.ValidationRulesCollection.push(fnmae_rule);

    let lnmae_rule: ValidationRule = new ValidationRule();
    lnmae_rule.IsRequired = true;
    lnmae_rule.DisplayNmae = "Last Name";
    lnmae_rule.MaxLength = 100;    
    lnmae_rule.PropName = "LastName";
    empFrmEntity.ValidationRulesCollection.push(lnmae_rule);

    let gender_rule: ValidationRule = new ValidationRule();
    gender_rule.IsRequired = true;
    gender_rule.DisplayNmae = "Gender";   
    gender_rule.PropName = "Gender";
    gender_rule.InValidInputVal=["default"];
    empFrmEntity.ValidationRulesCollection.push(gender_rule);


    let empType_rule: ValidationRule = new ValidationRule();
    empType_rule.IsRequired = true;
    empType_rule.DisplayNmae = "Employee Type";   
    empType_rule.PropName = "EmployeeTypeId";    
    empFrmEntity.ValidationRulesCollection.push(empType_rule);


    let doj_rule: ValidationRule = new ValidationRule();
    doj_rule.IsRequired = true;
    doj_rule.DisplayNmae = "Joining Date";   
    doj_rule.PropName = "DateOfJoining";    
    empFrmEntity.ValidationRulesCollection.push(doj_rule);

    let dept_rule: ValidationRule = new ValidationRule();
    dept_rule.IsRequired = true;
    dept_rule.DisplayNmae = "Department";   
    dept_rule.PropName = "DepartmentId";    
    empFrmEntity.ValidationRulesCollection.push(dept_rule);
    
    
    let role_rule: ValidationRule = new ValidationRule();
    role_rule.IsRequired = true;
    role_rule.DisplayNmae = "Employee Role";   
    role_rule.PropName = "RoleId";    
    empFrmEntity.ValidationRulesCollection.push(role_rule);
    
    let email_rule: ValidationRule = new ValidationRule();
    email_rule.IsRequired = true;
    email_rule.DisplayNmae = "Email";   
    email_rule.PropName = "Email";
    email_rule.RegExpresion=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    
    empFrmEntity.ValidationRulesCollection.push(email_rule);
    
    let app_role_rule: ValidationRule = new ValidationRule();
    app_role_rule.IsRequired = true;
    app_role_rule.DisplayNmae = "Application Role";   
    app_role_rule.PropName = "AppAccessRoles";    
    empFrmEntity.ValidationRulesCollection.push(app_role_rule);
    
    

    return empFrmEntity;
  }

}
