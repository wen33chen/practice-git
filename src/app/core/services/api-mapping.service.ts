import { Injectable, OnInit } from '@angular/core';


import { from, Observable, of, ReplaySubject } from 'rxjs';
import { filter, map, share, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'env/environment';
@Injectable({
  providedIn: 'root',
}
)
export class APiService {


  roleFeatureCodes$ = new Object;
  load(): void {//

    this.getMapping().subscribe(event =>{ this.roleFeatureCodes$ = event,console.log("aaaaaaaaaaaaa"+event)});
  }

  constructor(private http: HttpClient) {
    //this.getMapping().subscribe(event => this.roleFeatureCodes$ = event);
  }

  getApi(functionid, methodName) {


    if (this.roleFeatureCodes$[functionid]) {
      return this.roleFeatureCodes$[functionid][methodName];
    }
    return '';

    // return this.getMapping().subscribe(event => {
    //   this.roleFeatureCodes$ = event;
    //   if (this.roleFeatureCodes$[functionid]) {
    //     return this.roleFeatureCodes$[functionid][methodName];
    //   }

    // });
    //promise.then();
    // if(this.roleFeatureCodes$[functionid]){
    //    return this.roleFeatureCodes$[functionid][methodName];
    // }
    // return '';
    // return  this.roleFeatureCodes$;

  }
  getMapping() {
    const springurl = '/apimapping';
    const header = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    // 'Authorizatio': localStorage.getItem('spring'),
    return this.http.post<any>(springurl, {}, { headers: header});
  }


}
