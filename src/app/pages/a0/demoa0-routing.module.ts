import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Demoa00100Component } from './components/demoa00100/demoa00100.component';
import { Demoa00200Component } from './components/demoa00200/demoa00200.component';
import { Demoa00300Component } from './components/demoa00300/demoa00300.component';
import { PermissionGuard } from 'app/core/guards/permission.guard';
import { Demoa00400Component } from './components/demoa00400/demoa00400.component';
import { Demoa00401Component } from './components/demoa00400/demoa00401.component';
import { Demoa00600Component } from './components/demoa00600/demoa00600.component';
import { Demoa00700Component } from './components/demoa00700/demoa00700.component';
import { Demoa00800Component } from './components/demoa00800/demoa00800.component';
import { Demoa00900Component } from './components/demoa00900/demoa00900.component';
import { Demoa00310Component } from './components/demoa00300/demoa00310.component';

const routes: Routes = [
  {
    path: 'DEMOA0_0100',
    component: Demoa00100Component,
    data: { menuCode: 'DEMOA0_0100' }
  },
  {
    path: 'DEMOA0_0200',
    component: Demoa00200Component,
    data: { menuCode: 'DEMOA0_0200' }
  },
  {
    path: 'DEMOA0_0300',
    component: Demoa00300Component,
    data: { menuCode: 'DEMOA0_0300' }
  },
  {
    path: 'DEMOA0_0400',
    component: Demoa00400Component,
    data: { menuCode: 'DEMOA0_0400' }
  },
  {
    path: 'DEMOA0_0401',
    component: Demoa00401Component,
    data: { menuCode: 'DEMOA0_0400' }
  },
  {
    path: 'DEMOA0_0600',
    component: Demoa00600Component
  },
  {
    path: 'DEMOA0_0900',
    component: Demoa00900Component
  },
  {
    path: 'DEMOA0_0700',
    component: Demoa00700Component
  },
  {
    path: 'DEMOA0_0800',
    component: Demoa00800Component
  },
  {
    path: 'DEMOA0_0310',
    component: Demoa00310Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PermissionGuard]
})
export class Demoa0RoutingModule { }
