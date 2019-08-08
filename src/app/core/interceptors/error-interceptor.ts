import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/core/services/auth.service';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, finalize } from 'rxjs/operators';

import { NotifyService } from '../services/notify.service';
import { BlockServiceService } from '../../pages/blockui/block-service.service';
import { MessageService } from 'primeng/api';
import { STATUSCODE } from 'app/core/enums/statuscode.enum';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private notifyService: NotifyService,
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService,
    private blockServiceService: BlockServiceService,
    private messageService: MessageService
  ) { }

  correlationFlag = 'x-isshowcorrelationflag';
  correlationId = 'x-correlation-id';
  generalLang = this.translate.instant('general');
  errorLang = this.translate.instant('error');
  logoutLang = this.translate.instant('error');

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      concatMap(event => {
        if (event instanceof HttpResponse && event.body) {

          if (event.body.isSuccess === false) {
            let message = event.body.returnMessage;
            const flag = event.headers.get(this.correlationFlag);
            if (flag) {
              message += `，Trace Id:${event.headers.get(this.correlationId)}`;
            }
            this.notifyService
              .confirmAcceptOnly(message, this.errorLang['notifyErrorTitle'])
              .subscribe();

            return throwError(event.body);
          } else if (event.body.MWHEADER && event.body.MWHEADER.RETURNCODE !== "0000") {
            let message = event.body.MWHEADER.RETURNMESSAGE;
            const flag = event.headers.get(this.correlationFlag);
            if (flag) {
              message += `，Trace Id:${event.headers.get(this.correlationId)}`;
            }
            this.notifyService
              .confirmAcceptOnly(message, this.errorLang['notifyErrorTitle'])
              .subscribe();

            return throwError(event.body);
          } else if (event.body.MWHEADER && event.body.MWHEADER.RETURNCODE === "0000") {
            this.messageService.add({ severity: 'fail', detail: "琮文說要交易成功" });
          }
          //console.log("1");

          return of(event.clone({ body: event.body.TRANRS || event.body.Body || event.body }));
        }
        return of(event);
      }),
      catchError(e => {

        if (e instanceof HttpErrorResponse) {


          if (e.status === 401) {
            console.log(this.logoutLang['login']);
            this.notifyService
              .confirmAcceptOnly(
              this.logoutLang['login'],
              this.generalLang['notifyTitle']
              )
              .subscribe(_ => {
                this.authService.logout();
              });
            return EMPTY;
          } else if (e.status === 403) {
            this.router.navigate(['/403']);
            return EMPTY;
          } else if (e.status === 405) {
            console.log(e.message, "message");

            if (e.error) {
              this.notifyService
                .confirmAcceptOnly(e.error, this.errorLang['notifyErrorTitle'])
                .subscribe();
            }

            return EMPTY;
          } else if (e.status === 419) {
            // 419無權限/SessionTimeOut，直接導至/sso
            console.log('SessionTimeOut/LocalSessionRenew');
            this.router.navigate(['/sso']);
            return EMPTY;
          } else if (e.status === 500) {

            if (e.error.isSuccess !== true) {
              let message = e.error.message;
              const flag = e.headers.get(this.correlationFlag);
              if (flag) {
                message += `，${e.headers.get(this.correlationId)}`;
              }
              this.notifyService
                .confirmAcceptOnly(message, this.errorLang['notifyErrorTitle'])
                .subscribe();
              return EMPTY;
            }
          }
          return throwError(e.error);
        }
        return throwError(e);
      }), finalize(() => {
        this.blockServiceService.document = false;
        var count = this.blockServiceService.count
        if (count > 0) {
          this.blockServiceService.count--;
        }
      })
    );
  }
}
