import { APP_INITIALIZER, ErrorHandler, NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { CoreModule } from 'app/core/core.module';
import { CUBErrorHandler } from 'app/core/cub-error-handler';
import { BaseLayoutComponent } from 'app/layouts/base-layout/base-layout.component';
import { ForbiddenComponent } from 'app/pages/forbidden/forbidden.component';
import { LogoutComponent } from 'app/pages/logout/logout.component';
import { NotFoundComponent } from 'app/pages/not-found/not-found.component';
import { SharedPrimengModule } from 'app/shared-primeng/shared-primeng.module';
import { SharedModule } from 'app/shared/shared.module';

import { FooterComponent } from './layouts/components/footer/footer.component';
import { TopbarComponent } from './layouts/components/topbar/topbar.component';
import { LoginComponent } from './pages/login/login.component';
import { TranslateService } from '@ngx-translate/core';
import { I18n } from './core/enums/i18n.enum';
import { SsoComponent } from './pages/sso/sso.component';
import { BlockuiComponent } from './pages/blockui/blockui.component';
import { APiService } from './core/services/api-mapping.service';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { SplitButtonModule, SliderModule, MultiSelectModule, DialogModule } from 'primeng/primeng';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ValidateSpanComponent } from './pages/validate-span/validate-span.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedPrimengModule,
    SharedModule,
    AppRoutingModule,
    SplitButtonModule,
    SliderModule,
    MultiSelectModule,
    DynamicDialogModule,
    DialogModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      deps: [TranslateService],
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: CUBErrorHandler
    }, {
      provide: APiService,
      useClass: APiService
    },
    DatePipe,
    CookieService
  ],
  bootstrap: [AppComponent],
  declarations: [

    AppComponent,
    BaseLayoutComponent,
    NotFoundComponent,
    LogoutComponent,
    TopbarComponent,
    ForbiddenComponent,
    LoginComponent,
    FooterComponent,
    SsoComponent,
    BlockuiComponent

  ],
  entryComponents: [

  ]
})
export class AppModule {
}

export function appInit(translate: TranslateService) {
  return () => {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(I18n.zhTw);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(I18n.zhTw);
  };
}
