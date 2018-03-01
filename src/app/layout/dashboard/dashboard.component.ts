import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgPasswordStrength } from 'ng2-password-strength';

import { UserService } from '../../shared/user.service';
import { LookupService } from '../../shared/lookup.service';
import { LoginModelentity } from '../../models/user-model-entity';
import { ViewChild } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'], 
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    @ViewChild('modal1') windowopener;
    isDefaultPasswordSet: boolean;
    isUserProfileCompleted: boolean;
    logInDetails: LoginModelentity = new LoginModelentity();
    statusMessage: string = "";
    resetPasswordForm: FormGroup;
    private formSubmitAttempt: boolean = false;
    userInfo: any;
    isError: boolean;
    viewProject: boolean = false;
    componentName: string = "Employee";
    projHeader: string = "Show";
    rerender: boolean = false;

    constructor(private formBuilder: FormBuilder
        , private _userService: UserService) {
    }


    ngOnInit() {
        this.userInfo = JSON.parse(localStorage.getItem("UserInfo"));
        this.isDefaultPasswordSet = this.userInfo.IsDefaultPasswordSet;
        this.isUserProfileCompleted = this.userInfo.IsUserProfileCompleted;
        if (this.isDefaultPasswordSet) {
            this.resetPasswordForm = this.formBuilder.group({
                OldPassword: ['', Validators.required],
                Password: ['', Validators.required],
                ConfPassword: ['', Validators.required]
            },
                { validator: this.checkIfMatchingPasswords('Password', 'ConfPassword') });
        }
    }

    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ notEquivalent: true })
            }
            else {
                return passwordConfirmationInput.setErrors(null);
            }
        }
    }

    isFieldInvalid(field: string) {
        if (field == "ConfPassword") {
            if (this.resetPasswordForm.get(field).value == undefined
                || this.resetPasswordForm.get(field).value == '')
                return true;
            else
                return false;
        }
        else {
            return (
                (!this.resetPasswordForm.get(field).valid && this.resetPasswordForm.get(field).touched) ||
                (this.resetPasswordForm.get(field).untouched && this.formSubmitAttempt)
            );
        }
    }


    submitPasswordUpdate() {
        if (this.resetPasswordForm.valid) {
            this.logInDetails.EmpGuid = this.userInfo.EmpGuid;
            this._userService.updatePassword(this.logInDetails)
                .subscribe((respndsString) => {
                    this.statusMessage = respndsString;
                    if (this.statusMessage != "") {
                        this.isError = true;
                    } else {
                       
                        //this.windowopener.open();

                        // Update the below sctions with modal window insteded of alert window
                        alert("Password update successfully.\nYou will required to sign in with your new password.");
                        this._userService.logout();
                    }
                }
                , (error) => {
                    this.statusMessage = "Problem with User Service, please try after some time";
                    this.isError = true;
                    console.error(error);
                });
        }
        this.formSubmitAttempt = true;

    }

    ViewProject(): void {
        if (this.viewProject) {
            this.viewProject = false;
            this.projHeader = "Show";
        } else {
            this.viewProject = true;
            this.projHeader = "Hide";
        }
    }
    allocationModifiedEvent(isModified: boolean) {
        // No Implementaion.
    }

    refreshTimeSheetApprover(isModified: boolean) {
        if (isModified) {
            this.rerender = true;
            this.rerender = false;
        }
    }
}
