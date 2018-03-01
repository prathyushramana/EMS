import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import { UserService } from '../user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.userService.isLoggedIn       
      .take(1)                                
      .map((isLoggedIn: boolean) => {        
        if (!isLoggedIn){
          this.router.navigate(['/login']);  
          return false;
        }
        return true;
      });

  }

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

}
