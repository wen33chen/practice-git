import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cars } from '../cars';
import { TCustomer } from '../tcustomer';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  apiUrl = 'http://localhost:8082/';

  constructor(private http: HttpClient) { }

  getCusts() {
    const springurl =  '/getcusts';

    const headers = new HttpHeaders().set('Content-Type', 'application/josn;charset=utf-8');
    return this.http.post<TCustomer[]>(springurl, null, { headers: headers });
  }

  getCarsSmall() {
    const springurl =  '/getcar';

    const headers = new HttpHeaders().set('Content-Type', 'application/josn;charset=utf-8');
    return this.http.post<Cars[]>(springurl, null, { headers: headers });
  }
}
