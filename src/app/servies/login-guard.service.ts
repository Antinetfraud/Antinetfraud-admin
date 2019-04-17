import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { api } from '../functions/api';


@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private http: HttpClient, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    // Navigate to the login page with extras
    this.http.get(api('state')).subscribe(data => {
      if (data['code'] === 401) {

      } else if (data['code'] === 200) {
        this.router.navigate(['/admin/home']);
      } else {
        this.router.navigate(['/admin/home']);
      }
    });
    return true;
  }
}