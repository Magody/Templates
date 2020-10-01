import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log(next, state);

    const condition: boolean = this.authService.isLoggedIn();

    console.log("GuardUser: logged_in");
    console.log(condition);

    if(!condition){
      this.router.navigate(['/auth']);
    }

    return condition;


  }

}
