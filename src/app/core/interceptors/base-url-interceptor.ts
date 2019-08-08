import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';
import { environment } from 'env/environment';
import { APiService } from '../services/api-mapping.service';
import { HttpClient } from '@angular/common/http';
import { BlockServiceService } from '../../pages/blockui/block-service.service';
import { Telegram } from '../interfaces/Telegram';
import { Mwheader } from '../interfaces/Mwheader';
@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  roleFeatureCodes$ = new Object;
  constructor(private http: HttpClient, private aPiService: APiService, private blockServiceService: BlockServiceService) {

  }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.blockServiceService.document = false;
    this.blockServiceService.count++;

    // const headers = req.headers.delete(InterceptorSkipHeader);
    const headers = req.headers;
    console.log("headers")
    const url = req.url;
    const urlSplit = url.split('/');

    let api = this.aPiService.getApi(urlSplit[1], urlSplit[2]);
    if (!api) {
      api = url;
    }

    req = req.clone({
      withCredentials: true,
    });

    const myId = uuid.v4();
    const body = req.body;
    let json = {};
    if (body) {
      var object = {};
      if (body.foreach) {
        body.forEach(function (value, key) {
          object[key] = value;
        });
      }
      json = object;

    }
    const mwheader: Mwheader = { "TXNSEQ": myId, "Returnmessage": "", "Returncode": "0000" };
    const tele: Telegram = {
      "Header": mwheader,
      "Body": json
    };

    return next.handle(req.clone({ headers, body: tele, url: `${environment.springUrl}` + api }));




  }


}
