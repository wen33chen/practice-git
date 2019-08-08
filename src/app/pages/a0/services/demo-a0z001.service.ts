import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TCustomer } from '../interfaces/tcustomer';
import { Emp } from '../interfaces/emp';

@Injectable({
  providedIn: 'root'
})
export class DemoA0Z001Service {

  constructor(private http: HttpClient) { }

  httpOptions = {

    headers : new HttpHeaders( {
      'Content-Type' : 'application/x-www-form-urlencoded'
    }),
    withCredentials : true
  };

  getCusts() {
    const springurl = '/getcusts';
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post<TCustomer[]>(springurl, null, { headers: headers });
  }

  getEmps() {
    const springurl = '/getEmps';
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post<Emp[]>(springurl, null, { headers: headers });
  }
}
