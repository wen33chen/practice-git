import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { SystemMenuItem } from '../../core/interfaces/system-menu-item';
import { Profile } from '../../core/interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  authMenuCodes$ = new ReplaySubject<string[]>(1);

  constructor(private http: HttpClient) {
    // 此段程式碼移至BaseLayoutComponent中，讓每次進入baseLayout時接讀取一次此表，避免CommonService的construct時機過早而沒有取到MenuCodes清單
    this.getMenuCodesByRoleId().subscribe(this.authMenuCodes$);
  }

  // 輸出MenuItems
  getMenuItems(): Observable<SystemMenuItem[]> {
    const springurl = '/getMenuItems';
    const header = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    return this.http.post<SystemMenuItem[]>(springurl, null, { headers: header });
  }

  // 輸出該使用者有權限的MenuCodes
  getMenuCodesByRoleId() {
    const springurl = '/getMenuCodesByRole';
    const header = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    return this.http.post<String[]>(springurl, null, { headers: header });
  }

  // 輸出該使用者有關資訊供畫面顯示
  getProfile(): Observable<Profile> {
    const springurl = '/getUserProfile';
    const header = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    return this.http.post<Profile>(springurl, null, { headers: header });
  }

  getSwitchUser() {
    const springurl = '/getSwitchUser';
    const header = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    });
    return this.http.post<any>(springurl, null, { headers: header });
  }
}
