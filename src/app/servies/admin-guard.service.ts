import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CanActivateChild, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { api } from '../functions/api';


@Injectable()
export class AdminGuard implements CanActivateChild {
  constructor(private http: HttpClient, private router: Router) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    // Navigate to the login page with extras
    this.http.get(api('state')).subscribe(data => {
      if (data['code'] === 401) {
        console.log(data);
        this.router.navigate(['/login']);
      } else if (data['code'] === 200) {

      } else {
        this.router.navigate(['/login']);
      }
    });
    return true;
  }
}