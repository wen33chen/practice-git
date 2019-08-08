import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/services/auth.service';
import { tap } from 'rxjs/operators';
import { JwtSpringService } from '../../core/services/jwt-spring.service';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMsg: string;
  constructor(
    private jwtSpringService: JwtSpringService,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  login(): void {
    this.errorMsg = '';
    // this.http
    //   .get<string>(`/api/v1/SsoEndPoint?userId=${this.username}&token=token`)
    //   .pipe(
    //   tap(result => {
    //     this.authService.setToken(result);
    //     this.router.navigate(['/']);
    //   })
    //   )
    //   .subscribe();
    const springurl = '/gettoken';

    var headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    //headers.set('X-Skip-Interceptor', '');
    var test = this.http.post<any>(springurl, {
      "MWHEADER": {
        "RETURNCODE": "string",
        "TXNSEQ": "string"
      },
      "TRANRQ": {
        "password": "string",
        "username": this.username
      }
    }, { headers: headers }).pipe(
      tap(result => {

        this.jwtSpringService.setToken(result['a']);
        this.router.navigate(['/']);
      })
      ).subscribe();
  }
}
