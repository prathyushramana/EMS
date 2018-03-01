import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPasswordStrength } from 'ng2-password-strength';
import { DatePipe } from '@angular/common';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

import { BaseSerice } from './shared/base.service';
import { UserService } from './shared/user.service';
import { LookupService } from './shared/lookup.service';
import { EmployeeService } from './shared/employee.service'
import { ValidationService } from './shared/validation.service';
import { ProjectTaskService } from './shared/project-task.service';
import { AutoGridPipe } from './custom-control/auto-grid.pipe';
import { SharedModule } from '../app/shared/modules/shared/shared.module';




// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/EMS/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AngularMultiSelectModule,
        HttpModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        MultiselectDropdownModule,
        HttpClientModule,
        NgPasswordStrength.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule
    ],
    declarations: [AppComponent, AutoGridPipe],
    providers: [AuthGuard,
        BaseSerice,
        UserService,
        LookupService,
        ValidationService,
        ProjectTaskService,
        EmployeeService,
        DatePipe
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }
