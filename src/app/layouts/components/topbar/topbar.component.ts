import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TranslateService } from '@ngx-translate/core';
import { I18n } from 'app/core/enums/i18n.enum';
import { JwtSpringService } from '../../../core/services/jwt-spring.service';
import { CommonService } from 'app/shared/services/common.service';
import { Profile } from '../../../core/interfaces/profile';
import { environment } from 'env/environment';
import { APiService } from '../../../core/services/api-mapping.service';

const langMapping = new Map<string, string>([
  [I18n.zhTw, '繁體中文'],
  [I18n.zhCn, '简体中文'],
  [I18n.enUs, 'English']
]);

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  isLocal = environment.isLocal;
  switchUser: any;
  userSelect: any;
  lang$: BehaviorSubject<string>;
  topNavItems: Profile = { DeptCode: '11', DeptName: '', EmpName: '', EmpNo: '' };
  tt: Subscription;
  langMappingSpring: String[] = [
    '繁體中文',
    '简体中文',
    'English'
  ];
  constructor(
    private http: HttpClient,
    private authService: JwtSpringService,
    private translate: TranslateService,
    private api: APiService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.lang$ = new BehaviorSubject(this.translate.currentLang);
    this.tt = this.translate.onLangChange
      .pipe(map(x => x.lang))
      .subscribe(this.lang$);

    const langMenuItems: MenuItem[] = [
      {
        label: langMapping.get(I18n.zhTw),
        command: () => this.translate.use(I18n.zhTw)
      },
      {
        label: langMapping.get(I18n.zhCn),
        command: () => this.translate.use(I18n.zhCn)
      },
      {
        label: langMapping.get(I18n.enUs),
        command: () => this.translate.use(I18n.enUs)
      }
    ];
    this.api.load();
    this.commonService.getSwitchUser().subscribe(result => { this.switchUser = result.switchUsers; console.log(result); });
    this.commonService.getProfile().subscribe(result => {
      this.topNavItems = result;
      this.userSelect = result.EmpNo;
      console.log(result);
    });

    // this.topNavItems$ = this.lang$.pipe(
    //   tap(x => console.log('lang change', x)),
    //   switchMap(language =>
    //     this.commonService.getProfile().pipe(
    //       map(profile => [
    //         {
    //           label: langMapping.get(language),
    //           icon: 'fas fa-globe-asia',
    //           items: langMenuItems
    //         },

    //         {
    //           label: profile.DeptName,
    //           icon: 'fas fa-university'
    //         },
    //         {
    //           label: profile.EmpName,
    //           icon: 'fas fa-user',
    //           items: [
    //             {
    //               label: this.translate.instant('topbar')['logout'],
    //               command: () => this.authService.logout()
    //             }
    //           ]
    //         }
    //       ])
    //     )
    //   )
    // );
  }

  switchUserChange(deviceValue) {
    console.log(deviceValue);
    const springurl = '/changeUser?$CathayBK-SwitchUser-request$_token=' + deviceValue;
    const header = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    });
    this.http.get<any>(springurl, { headers: header }).subscribe();
  }

  logout() {
    this.authService.logout();
  }
}
