import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { routerTransition } from '../router.animations';
import { FormName } from '../shared/utility/constant';

import { ValidationService } from '../shared/validation.service';
import { UserService } from '../shared/user.service';

import { LoginModelentity } from '../models/user-model-entity';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    loginform: FormGroup;
    private formSubmitAttempt: boolean;
    loginModelentity: LoginModelentity = new LoginModelentity();
    isLoggingFailed: boolean = false;
    statusMessage: string = "";
  
    validationMsg: string[];
    showErrorDetails: boolean = false;
  
    constructor(private userService: UserService
      , private _validationService: ValidationService
    ) {
      localStorage.clear();
    }
  
    ngOnInit() {
      localStorage.clear();   
    }
    
  
    onSubmit() { 
      if (this.validateFormInput()) {     
        this.isLoggingFailed = false;      
        this.userService.login(this.loginModelentity)
          .then((userInfoDetails) => {
            if (userInfoDetails != null) {
              localStorage.setItem("UserInfo", JSON.stringify(userInfoDetails));
              let userName: string = userInfoDetails.UserDisplayName;
              this.userService.SetDisplayName(userName);
              this.userService.SetUserInfoModelentity(userInfoDetails);
              this.userService.SetProfileCompleted(userInfoDetails.IsUserProfileCompleted);
              this.userService.PostValidation();
            } else {
              this.isLoggingFailed = true;
              this.statusMessage = "Invalid Username or Password";
            }
          }
          , (error) => {
            console.error(error);
          });      
      } 
      this.formSubmitAttempt = true;
    }
  
    validateFormInput(): boolean {
      this.validationMsg = [];
      this.showErrorDetails = false;
      this.validationMsg = this._validationService.IsValid(FormName.login, this.loginModelentity);
      if (this.validationMsg.length > 0) { 
        this.showErrorDetails = true;
        return false;
      }
      else
        return true;
    }
}
