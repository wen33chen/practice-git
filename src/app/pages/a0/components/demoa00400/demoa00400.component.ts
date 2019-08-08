import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-demoa00400',
  templateUrl: './demoa00400.component.html',
  styleUrls: ['./demoa00400.component.scss']
})
export class Demoa00400Component implements OnInit {

  tableData: any[]; // 表繫結的資料

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    const springurl = '/DEMOA00400/getData';

    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');

    this.http.post<any[]>(springurl, null, { headers: headers }).subscribe(resp => {
      this.tableData = resp;
    });
  }

  handleEdit(roleId: number) {
    // const navigationExtras: NavigationExtras = {
    //   queryParams: { 'role': roleId }
    // };
    // this.router.navigate(['/A0/DEMOA0_0401', navigationExtras]);

    this.router.navigate(['/A0/DEMOA0_0401'], {
      queryParams: {
          role: roleId
      }
  });
  }

}
