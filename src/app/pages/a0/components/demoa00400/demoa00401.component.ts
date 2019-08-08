import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NotifyService } from 'app/core/services/notify.service';
import { NotifySeverity } from 'app/core/enums/notify-severity.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-demoa00401',
  templateUrl: './demoa00401.component.html',
  styleUrls: ['./demoa00401.component.scss']
})
export class Demoa00401Component implements OnInit {
  thePassingRole: any;
  modeVal = 'new';
  inputVal: string = '1';

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private notifyService: NotifyService,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.thePassingRole = queryParams.role;
      console.log(this.thePassingRole);
    });
  }

  inputChange() {
    console.log(this.inputVal);
    console.log(this.modeVal);
  }

  submit() {
    console.log('role:' + this.thePassingRole + ',modeVal:' + this.modeVal + ',inputVal:' + this.inputVal);
    console.log(localStorage.getItem('spring'));

    const springurl = '/DEMOA00400/modifyData';
    const headers = new HttpHeaders();
    const formData = new FormData();
    const generalLang = this.translate.instant('general');
    formData.append('role', this.thePassingRole);
    formData.append('mode', this.modeVal);
    formData.append('menuCode', this.inputVal);
    this.http.post<any>(springurl, formData, { headers: headers }).subscribe(_ => {
      this.notifyService.notify(
        NotifySeverity.success,
        generalLang['success'],
        generalLang['successUpdatefile']
      );
      this.router.navigate(['/A0/DEMOA0_0400']);
    });

  }
}
