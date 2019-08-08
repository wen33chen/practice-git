import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Cars } from '../interfaces/cars';

@Injectable({
  providedIn: 'root'
})
export class Demoa00100Service {

  constructor(private http: HttpClient) { }

  getCars() {
    const springurl =  '/getcar';
    const headers = new HttpHeaders().set('Content-Type', 'application/josn;charset=utf-8');
    return this.http.post<Cars[]>(springurl, null, { headers: headers });
  }

  getManufracture() {
    const springurl =  '/getmanu';

    const headers = new HttpHeaders().set('Content-Type', 'application/josn;charset=utf-8');
    return this.http.post<Cars[]>(springurl, null, { headers: headers });
  }
}
