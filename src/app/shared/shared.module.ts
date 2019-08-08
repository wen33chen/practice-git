import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedPrimengModule } from '../shared-primeng/shared-primeng.module';
import { CitySelectorComponent } from './components/city-selector/city-selector.component';
import { FeatureAuthDirective } from './directives/feature-auth.directive';
import { ActiveTextDirective } from './directives/active-text.directive';
import { RoleClient } from './swagger-gen';
import { BlockuiComponent } from '../pages/blockui/blockui.component';
import { FeatureAuthHidden } from './directives/feature-auth-hidden.directive';
import { decimalFormat } from './directives/decimal-format';
import { ValidateError } from './directives/validateError';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';


@NgModule({
  imports: [CommonModule, FormsModule, SharedPrimengModule, TranslateModule],
  declarations: [
    CitySelectorComponent,
    AutoCompleteComponent,
    FeatureAuthDirective,
    ActiveTextDirective,
    FeatureAuthHidden,
    decimalFormat,
    ValidateError,


  ],
  exports: [
    CitySelectorComponent,
    AutoCompleteComponent,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    FeatureAuthDirective,
    ActiveTextDirective,
    FeatureAuthHidden,
    ValidateError,
    decimalFormat,



  ],
  providers: [RoleClient]
})
export class SharedModule {}
