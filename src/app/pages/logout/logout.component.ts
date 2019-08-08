import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/services/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private cookieService: CookieService,
    ) {}

  ngOnInit() {
    this.doLogout();
  }

  login() {
    //this.authService.login();
    this.router.navigate(['/']);
  }

  doLogout() {
    const springurl = '/logout';
    const headers = new HttpHeaders();

      //.set('X-Skip-Interceptor', '');
    this.http.post<any>(springurl, null, { headers: headers }).subscribe(_ => {
      // 清除JWT Token
      localStorage.removeItem('spring');
      // 清除所有cookies
      this.cookieService.deleteAll();
      this.messageService.add({ severity: 'info', summary: 'Log out' });
      location.replace('about:blank');
      window.close();
    });
  }
}
