import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Test1Component } from '../components/test1/test1.component';
import { Test2Component } from '../components/test2/test2.component';
import { Test3Component } from '../components/test3/test3.component';
import { Wendemo1Component } from '../components/wendemo1/wendemo1.component';
import { WenDemo2Component } from '../components/wendemo2/wendemo2.component';
import { Wendemo0Component } from '../components/wendemo0/wendemo0.component';
import { Wendemo3Component } from '../components/wendemo3/wendemo3.component';
import { PermissionGuard } from 'app/core/guards/permission.guard';
import { Wendemo4Component } from 'app/pages/components/test/wendemo4/wendemo4.component';


const routes: Routes = [
  {
    path: '',
    component: Test1Component,
     data: { menuCode: 'TS_1001' }
  },
  {
    path: 't2',
    component: Wendemo0Component,
    data: { menuCode: 'TS_1002' }
  },
  {
    path: 't3',
    component: Wendemo1Component,
    data: { menuCode: 'TS_1003' }
  },
  {
    path: 't4',
    component: WenDemo2Component,
    data: { menuCode: 'TS_1004' }
  },
  {
    path: 't5',
    component: Wendemo3Component,
    data: { menuCode: 'TS1005' }
  },
  {
    path: 't6',
    component: Wendemo4Component,
    data: { menuCode: '30001' }
  },
  {
    path: 'edit',
    component: Test2Component,
    data: { menuCode: '30001' }
  },
  {
    path: 'test3',
    component: Test3Component,
    data: { menuCode: '8' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
