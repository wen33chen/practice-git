import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-wendemo3',
  templateUrl: './wendemo3.component.html',
  styleUrls: ['./wendemo3.component.scss']
})
export class Wendemo3Component implements OnInit {

  constructor(private http: HttpClient, ) { }

  ngOnInit() {
  }

  downloadFile() {
    const springurl = '/download';
    const header = new HttpHeaders({
    });
    //'Authorizatio': localStorage.getItem('spring'),

    this.http.post<any>(springurl, null, { headers: header, responseType: 'blob' as 'json' }).subscribe(response => {
      console.log(response);
      const file = new Blob([response], { type: 'octet/stream' });
      saveAs(file, 'text.xls');
    });
  }
}
