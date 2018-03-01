import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../../../app/shared/user.service';
import { UserInfoModelentity } from '../../../models/user-model-entity';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})


export class SidebarComponent implements OnInit {

    @ViewChild("modal1")
    userInfomodal;
    
    isActive: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';

    
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<string>;
  isProfileCompleted$: Observable<boolean>;
  userInfoModelentity: UserInfoModelentity;
  isDefaultPasswordSet: boolean;

  /* flags for access to nav links*/
  accessToEmployee: boolean=false;
  accessToCustomer: boolean=false;
  accessToProject: boolean=false;
  accessToTimeSheet: boolean=false;
  accessToReport: boolean=false;

    constructor(private translate: TranslateService,private _userService: UserService, public router: Router) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');
        this.userInfoModelentity=new UserInfoModelentity();
        

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
        
    }
      
    ngOnInit() {
        this.isLoggedIn$ = this._userService.isLoggedIn;
        this.currentUser$ = this._userService.UserDisplayName;
        this.isProfileCompleted$=this._userService.IsProfileCompleted;
        
        this._userService.UserInfoModelentity.subscribe((userDetails) => {
          this.userInfoModelentity = userDetails;
        });
        this._userService.UserInfoModelentity
        .subscribe((userInfo)=>{
            this.isDefaultPasswordSet=userInfo.IsDefaultPasswordSet;
        });
        this.isLoggedIn$.subscribe((logged) => {
            if (logged){
              this.accessToEmployee=false;
              this.accessToCustomer=false;
              this.accessToProject=false;
              this.accessToTimeSheet=false;
              this.accessToReport=false;
              this.setAccessToNavigationLink();
            }
          });
    }

    onLogout() {
        this._userService.logout();   
      }
    
      viewUserProfile() {
        this.userInfomodal.show();
      }
    
      setAccessToNavigationLink() {
        if(this.isProfileCompleted$){
        let argUserRoles: string[] = this.userInfoModelentity.UserAppRoles;    
        //Access to employee
        if (argUserRoles.find(elm => elm === "ADMIN")
          || argUserRoles.find(elm => elm === "HRMG")
          || argUserRoles.find(elm => elm === "MNGR"))
          this.accessToEmployee = true;
    
        //Access to Customer
        if (argUserRoles.find(elm => elm === "ADMIN")
        || argUserRoles.find(elm => elm === "HRMG")
        || argUserRoles.find(elm => elm === "MNGR"))
        this.accessToCustomer = true;  
    
        //Access to Project
        if (argUserRoles.find(elm => elm === "ADMIN")
          || argUserRoles.find(elm => elm === "MNGR"))
          this.accessToProject = true;
    
        //Access to Timesheet
        if (argUserRoles.find(elm => elm === "ADMIN")
          || argUserRoles.find(elm => elm === "USER"))
          this.accessToTimeSheet = true;
    
        //Access to Report
        if (argUserRoles.find(elm => elm === "ADMIN")
          || argUserRoles.find(elm => elm === "HRMG")
          || argUserRoles.find(elm => elm === "MNGR"))
          this.accessToReport = true;     
        }
      }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
