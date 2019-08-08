import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { switchMapTo, tap, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { FeatureService } from 'app/pages/feature/services/feature.service';
import { CommonService } from '../../shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivateChild {
  constructor(private commonService: CommonService, private router: Router) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const menuCode = childRoute.data && <string>childRoute.data.menuCode;

    if (menuCode) {
      console.log('Thru PermissionGuard');
      return this.commonService.authMenuCodes$.pipe(
        map(codes => codes.includes(menuCode)),
        tap(isPermission => {
          if (!isPermission) {
            this.router.navigate(['403']);
          }
        })
      );
    }

    return true;
  }
}
