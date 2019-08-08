import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-sso',
  templateUrl: './sso.component.html',
  styleUrls: ['./sso.component.scss']
})
export class SsoComponent implements OnInit {
  errorMsg = 'Wait for SSO Login...';
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.autoLogin();
  }

  autoLogin() {
    console.log('Thr/Doing SSO');

    const { UserID, Token } = this.route.snapshot.queryParams;

    const springurl = '/ssoEndPoint';
    const params = new HttpParams().set('UserID', UserID).set('Token', Token);

    this.http.get<any>(springurl, { params }).subscribe(_ => {
      this.router.navigate(['/']);
    });
  }

}
