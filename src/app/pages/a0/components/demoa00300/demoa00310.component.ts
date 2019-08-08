import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Demoa00100Service } from '../../services/demoa00100.service';
import { DemoA0Z001Service } from '../../services/demo-a0z001.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-demoa00310',
  templateUrl: './demoa00310.component.html',
  styleUrls: ['./demoa00310.component.scss']
})
export class Demoa00310Component implements OnInit {

  url: SafeResourceUrl;
  result: any;

  constructor(
    private sanitizer: DomSanitizer,
    private demoa00100Service: Demoa00100Service,
    private dataService: DemoA0Z001Service,
    private client: HttpClient
  ) { }

  ngOnInit() {

    // this.ionViewDidLoad();

  }

  awaitTest() {
    const delay = timeout => new Promise(resolve => { setTimeout(resolve, timeout); console.log('...'); });
    async function f() {
      await delay(2000);
      await delay(4000);
      await delay(6000);
      return 'done';
    }
    f().then(v => console.log(v));
  }

  getMutiDataTest() {
    const getDataAPI = [
      this.demoa00100Service.getCars(),
      this.dataService.getCusts(),
      this.dataService.getEmps(),
    ];
    combineLatest(
      getDataAPI
    ).subscribe(result => {
      console.log(result[0]);
      console.log(result[1]);
      console.log(result[2]);
    });
  }

  ionViewDidLoad() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.momoshop.com.tw/');
  }

  testPromise() {
    console.log('執行開始', 'testPromise');
    this.initData().then(async (data) => { // 宣告此方法為async，下方才能使用await保留字
      this.result = data;
      console.log(this.result, 'result');
      await this.dataService.getEmps().toPromise().then(resp => { console.log('run', 'result2'); console.log(resp, 'result2'); });
      console.log('執行完成', 'testPromise');
    });
  }

  testSubScribe() {
    console.log('執行開始', 'testSubScribe');
    const headers = new HttpHeaders().set('Content-Type', 'application/josn;charset=utf-8');
    this.dataService.getEmps().subscribe(
      suc => {
        console.log('1');
        console.log(suc);
        const url = '/topicList';
        this.client.post<any>(url, null, { headers: headers }).subscribe(
          succ => {
            console.log('2');
            console.log(succ);
            const url2 = '/getcar';
            this.client.post<any>(url2, null, { headers: headers }).subscribe(
              succc => {
                console.log('3');
                console.log(succc);
              });
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
    console.log('執行完成', 'testSubScribe');
  }

  async initData() {
    console.log('initData 執行開始');
    const data = await this.getData();
    console.log(data, 'initData');
    console.log('initData 執行完成');
    return data;
  }

  getData() {
    console.log('getData 執行開始');
    // const data = this.client.get(url);
    const data = this.demoa00100Service.getCars().toPromise();
    console.log(data, 'getData');
    console.log('getData 執行完成');
    return data;
  }

}
