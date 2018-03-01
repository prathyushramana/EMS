import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule }  from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { StatModule } from '../../shared';
import { ModalWindowComponent } from './component/modal-window/modal-window.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPasswordStrength } from 'ng2-password-strength';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        DashboardRoutingModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        NgPasswordStrength.forRoot(),
        FormsModule,
        StatModule
    ],
    declarations: [
        DashboardComponent,
        ModalWindowComponent     
    ],
    providers:
    [

    ]
})
export class DashboardModule {}
