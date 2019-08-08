import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TestRoutingModule } from './test-routing.module';
import { Test1Component } from '../components/test1/test1.component';
import { Test2Component } from '../components/test2/test2.component';
import { SharedModule } from '../../../shared/shared.module';
import { SharedPrimengModule } from '../../../shared-primeng/shared-primeng.module';
import { Test3Component } from '../components/test3/test3.component';
import { APiService } from '../../../core/services/api-mapping.service';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { Wendemo1Component } from '../components/wendemo1/wendemo1.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CarsListDemo } from '../components/carslistdemo';
import { DialogModule } from 'primeng/dialog';
import { WenDemo2Component } from '../components/wendemo2/wendemo2.component';
import { SplitButtonModule, TabMenuModule } from 'primeng/primeng';
import { Wendemo0Component } from '../components/wendemo0/wendemo0.component';
import { MatTabsModule, MatIconModule } from '@angular/material';
import { Wendemo3Component } from '../components/wendemo3/wendemo3.component';
import { Wendemo4Component } from 'app/pages/components/test/wendemo4/wendemo4.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedPrimengModule,
    TestRoutingModule,
    SliderModule,
    MultiSelectModule,
    DynamicDialogModule,
    DialogModule,
    SplitButtonModule,
    TabMenuModule,
    MatTabsModule,
    MatIconModule
  ],
  declarations: [
    Test1Component,
    Test2Component,
    Wendemo0Component,
    Wendemo1Component,
    WenDemo2Component,
    Wendemo3Component,
    Wendemo4Component,
    Test3Component,
    CarsListDemo
  ],
  entryComponents: [
    Wendemo0Component,
    Wendemo1Component,
    WenDemo2Component,
    Wendemo3Component,
    CarsListDemo
  ]
})
export class TestModule {

}
