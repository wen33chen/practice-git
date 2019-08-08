import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from 'app/pages/forbidden/forbidden.component';
import { LogoutComponent } from 'app/pages/logout/logout.component';
import { NotFoundComponent } from 'app/pages/not-found/not-found.component';
import { LoginComponent } from 'app/pages/login/login.component';

import { BaseLayoutComponent } from 'app/layouts/base-layout/base-layout.component';

import { PermissionGuard } from './core/guards/permission.guard';
import { SsoComponent } from './pages/sso/sso.component';
import { TestModule } from './pages/test/test/test.module';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
     {
        path: 'test',
        loadChildren:
          './pages/test/test/test.module#TestModule',
          canActivateChild: [PermissionGuard]
      },
      {
        path: 'A0',
        loadChildren:
          './pages/a0/demoa0.module#Demoa0Module',
          canActivateChild: [PermissionGuard]
      },
    ]
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sso',
    component: SsoComponent
  },
  {
    path: '403',
    component: ForbiddenComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PermissionGuard]
})
export class AppRoutingModule { }
