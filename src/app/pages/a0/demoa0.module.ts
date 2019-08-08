import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { Demoa0RoutingModule } from './demoa0-routing.module';
import { Demoa00100Component } from './components/demoa00100/demoa00100.component';
import { Demoa00200Component } from './components/demoa00200/demoa00200.component';
import { SharedPrimengModule } from 'app/shared-primeng/shared-primeng.module';
import { SplitButtonModule, DialogModule, SliderModule, FileUploadModule, RadioButtonModule, TabViewModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { Demoa00101Component } from './components/demoa00100/demoa00101.component';
import { Demoa00300Component } from './components/demoa00300/demoa00300.component';
import { FeatureAuthDirective } from 'app/shared/directives/feature-auth.directive';
import { SharedModule } from 'app/shared/shared.module';
import { Demoa00400Component } from './components/demoa00400/demoa00400.component';
import { Demoa00401Component } from './components/demoa00400/demoa00401.component';
import { Demoa00600Component } from './components/demoa00600/demoa00600.component';

import { MessageService } from 'primeng/api';
import {Message,MessageModule} from 'primeng/primeng';


import { Demoa00900Component } from './components/demoa00900/demoa00900.component';

import { Demoa00700Component } from './components/demoa00700/demoa00700.component';
import { ValidateSpanComponent } from '../validate-span/validate-span.component';
import { Demoa00800Component } from './components/demoa00800/demoa00800.component';
import { Demoa00310Component } from './components/demoa00300/demoa00310.component';

@NgModule({
  declarations: [
    Demoa00100Component,
    Demoa00200Component,
    Demoa00101Component,
    Demoa00300Component,
    Demoa00400Component,
    Demoa00401Component,
    Demoa00600Component,
    Demoa00900Component,
    Demoa00700Component,
    Demoa00800Component,
    ValidateSpanComponent,
    Demoa00310Component,
  ],
  entryComponents: [
    Demoa00101Component,
    Demoa00401Component,
    Demoa00700Component
  ],
  imports: [
    CommonModule,
    Demoa0RoutingModule,
    FormsModule,
    SharedModule,
    SharedPrimengModule,
    SplitButtonModule,
    DynamicDialogModule,
    DialogModule,
    SliderModule,
    FileUploadModule,
    RadioButtonModule,
    MessageModule,
    TabViewModule
  ],
  providers: [
    FeatureAuthDirective,
    CurrencyPipe

  ]
})
export class Demoa0Module { }
