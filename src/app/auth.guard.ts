import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authService.getAuthState().pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
