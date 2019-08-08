import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FileServiceSpring {

  constructor(private http: HttpClient) { }

  post(files: File[], uploadName: string) {
    const formData = new FormData();

    formData.append('uploadname', uploadName);

    files.forEach(file => {
      formData.append('file', file);
    });

    const springurl = '/api/files'

    var headers = new HttpHeaders();
    return this.http.post<any>(springurl, formData, { headers: headers });
    //.set('Authorizatio', localStorage.getItem('spring'))
    //return this.http.post(springurl, formData);
  }


  getPDF() {
    //return this.http.post(springurl, formData);
  }
}
