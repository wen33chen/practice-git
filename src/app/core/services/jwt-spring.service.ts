import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Profile } from 'app/core/interfaces/profile';
import { AuthService } from 'app/core/services/auth.service';
import { from, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class JwtSpringService implements AuthService {
  jwtHelper = new JwtHelperService();

  constructor(private router: Router) {}

  getProfile(): Observable<Profile> {
    var test = this.getToken().pipe(
      filter(x => !!x),
      map(token => this.jwtHelper.decodeToken(token)),
      map((payload: any) => (
        {
        EmpName: payload.EmpName,
        EmpNo: payload.EmpNo,
        DeptCode: payload.DeptCode,
        DeptName: payload.DeptName
      }))
    );
    return test;
  }

  login(): Observable<any> {
    return from(this.router.navigate(['/login']));
  }

  logout(): Observable<any> {
    return from(this.router.navigate(['/logout']));
  }

  setToken(value: string) {
    localStorage.setItem('spring', value);
  }

  getToken() {
    return of(localStorage.getItem('spring'));
  }

  isTokenExpired(): Observable<boolean> {
    return this.getToken().pipe(
      map(token => token && this.jwtHelper.isTokenExpired(token))
    );
  }
}
