import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, DialogService, MenuItem, ConfirmationService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Cars } from 'app/pages/test/cars';
import { Demoa00101Component } from './demoa00101.component';
import { saveAs } from 'file-saver'; // 檔案下載需引用
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FileServiceSpring } from 'app/pages/test/components/file.service';
import { NotifyService } from 'app/core/services/notify.service';
import { TranslateService } from '@ngx-translate/core';
import { FileUpload } from 'primeng/primeng';
import { NotifySeverity } from 'app/core/enums/notify-severity.enum';
import { CalendarService } from 'app/shared/services/calendar.service';
import { DateService } from 'app/shared/services/date.service';
import { Demoa00100Service } from '../../services/demoa00100.service';



@Component({
  selector: 'app-demoa00100',
  templateUrl: './demoa00100.component.html',
  styleUrls: ['./demoa00100.component.scss'],
  providers: [DialogService]
})
export class Demoa00100Component implements OnInit {

  // 日曆
  valueDate: Date = new Date();
  tw: any;

  // Popup
  buttonItems2: MenuItem[];
  dialogDisplay = false; // 控制是否顯示dialog的旗標

  // 檔案上傳
  fileList: FileList;
  form: FormGroup;

  //autocomplete
  value = 'test';
  data: any[];

  value2 = 'test';
  data2: any[];

  //動態決定檔案上傳大小限制所需變數
  //maximumSize: String;

  @ViewChild(FileUpload, { static: false })
 private fileupload: FileUpload;

  constructor(
    private messageService: MessageService,
    private datepipe: DatePipe,
    private calendarService: CalendarService,
    private http: HttpClient,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private fileServiceSpring: FileServiceSpring,
    private notifyService: NotifyService,
    private translate: TranslateService,
    private dateService: DateService,
    private demoa00100Service: Demoa00100Service

  ) { }

  ngOnInit() {
    // 日曆
    this.valueDate.setDate(this.valueDate.getDate() - 5);
    this.tw = this.calendarService.getTWLocales();

    this.demoa00100Service.getManufracture().subscribe(resp => { this.data = resp; this.data2 = resp; });
    // 檔案上傳
    this.form = this.fb.group({
      uploadName: ['', Validators.required],
      files: this.fb.array([], Validators.required)
    });

    // 動態決定檔案上傳大小，在元件初始載入時發api取得規定的檔案大小

    // const header = new HttpHeaders({
    //   'Authorizatio': localStorage.getItem('spring'),
    //   'X-Skip-Interceptor': '',
    // });

    // this.http.post('/getFileSize', null, { headers: header, responseType: 'json' }).subscribe(resp => {
    //   this.maximumSize = resp.toString();
    // });

    // 定義分割按鈕的內容
    this.buttonItems2 = [
      {
        label: 'ConfirmDialog', icon: 'pi pi-refresh', command: () => {
          this.confirm();
        }
      },
      {
        label: 'SimpleDialog', icon: 'pi pi-times', command: () => {
          this.showDialog();
        }
      }
    ];
  }
  testDateService() {
    // date.js
    // isADdate
    console.log(this.dateService.isADdate('2019-07-16'), 'isADdateT:2019-07-16');
    console.log(this.dateService.isADdate('2019-15-16'), 'isADdateF:2019-15-16');
    // diffday
    // tslint:disable-next-line: max-line-length
    console.log(this.dateService.diffDayY2K(this.dateService.stringToDate_Y2K('2019-07-19'), this.dateService.stringToDate_Y2K('2019-07-15')), 'diffday:2019-07-19/2019-07-15');
    // diffdayString
    console.log(this.dateService.diffDayY2KString('2019-07-19', '2019-07-15'), 'diffdayString:2019-07-19/2019-07-15');
    // addDate
    console.log(this.dateService.addDate('2016-02-29', 1, 0, 0), 'addDate:2017-02-28(1,0,0)');
    console.log(this.dateService.addDate('2016-03-29', -1, -1, 0), 'addDate:2015-02-28(-1,-1,0)');
    // format Date
    console.log(this.dateService.format(new Date(), 'yyyy-MM-dd'), 'format1:Today');
    console.log(this.dateService.format(new Date(), 'yyyy-MMMM-dd'), 'format2:Today');
    // isLeap
    console.log(this.dateService.isLeap('2019-01-01'), 'isLeap:2019');
    console.log(this.dateService.isLeap('2012-01-01'), 'isLeap:2012');
    console.log(this.dateService.isLeap('1900-01-01'), 'isLeap:1900');
    console.log(this.dateService.isLeap('2000-01-01'), 'isLeap:2000');
    // getY2KToday
    console.log(this.dateService.getY2KToday(), 'getY2KToday');
    // getTime
    console.log(this.dateService.getTime(), 'getTime');
  }
  getManu(event: string) {
    console.log(event);
    this.value = event;

  }
  getManu2(event: string) {
    console.log(event);
    this.value2 = event;

  }
  test() {
    console.log(this.value);
  }
  showDate() {
    console.log(this.valueDate);
    console.log(this.datepipe.transform(this.valueDate, 'yyyyMMdd'));
    this.messageService.add({ severity: 'success', detail: this.valueDate.toDateString() });
  }

  getApi2() {
    const header = new HttpHeaders({
      'Authorizatio': localStorage.getItem('spring'),
    });
    this.http.post<any>('/XXT00100/AuthButton', null, { headers: header, responseType: 'json' }).subscribe((response) => {
      console.log(response, 'response');
    });
  }

  getApi() {
    const header = new HttpHeaders({
      'Authorizatio': localStorage.getItem('spring'),
    });
    this.http.post<any>('/XXT00100/insertButton', null, { headers: header, responseType: 'json' }).subscribe((response) => {
      console.log(response, 'response');
    });
  }

  popup() {
    const ref = this.dialogService.open(Demoa00101Component, {
      header: 'Choose a Car',
      width: '70%',
      contentStyle: { 'max-height': '350px', 'overflow': 'auto' }
    });
    ref.onClose.subscribe((car: Cars) => {
      if (car) {
        this.messageService.add({ severity: 'info', summary: 'Car Selected', detail: 'Manufacturer:' + car.manufacturer });
      }
    });
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: '耶!', detail: '你選了同意' });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected.' });
      }
    });
  }

  showDialog() {
    this.dialogDisplay = true;
  }

  downloadFile() {
    const springurl = '/download';
    const header = new HttpHeaders({
      'Authorizatio': localStorage.getItem('spring'),
    });

    this.http.post<any>(springurl, null, { headers: header, responseType: 'blob' as 'json' }).subscribe(response => {
      console.log(response);
      const file = new Blob([response], { type: 'octet/stream' });
      saveAs(file, 'text.xls');
    });
  }

  getPdf() {
    const springurl = '/getpdf';
    const header = new HttpHeaders({
      'Authorizatio': localStorage.getItem('spring'),
    });
    this.http.post<any>(springurl, null, { headers: header, responseType: 'blob' as 'json' }).subscribe((response) => {
      const file = new Blob([response], { type: 'application/pdf' });

      const fileURL = URL.createObjectURL(file);
      window.open(fileURL); //缺參數
    });
  }

  downloadPdf() {
    const springurl = '/getpdf';
    const header = new HttpHeaders({
      'Authorizatio': localStorage.getItem('spring'),
    });
    this.http.post<any>(springurl, null, { headers: header, responseType: 'blob' as 'json' }).subscribe((response) => {
      const file = new Blob([response], { type: 'application/pdf' });
      saveAs(file, 'text.pdf');
    });
  }

  // 以下三個檔案上傳
  setFiles(event) {
    this.form.setControl(
      'files',
      new FormArray(
        Array.from(event.files || []).map(x => new FormControl(x)),
        Validators.required
      )
    );
  }
  clear() {
    this.form.setControl('files', new FormArray([], Validators.required));
  }

  submit() {
    const formData = this.form.value;
    const generalLang = this.translate.instant('general');
    const header = new HttpHeaders({
      'Authorizatio': localStorage.getItem('spring'),
    });
    this.fileServiceSpring.post(formData.files, formData.uploadName).subscribe(_ => {
      this.notifyService.notify(
        NotifySeverity.success,
        generalLang['success'],
        generalLang['successUpdatefile']
      );
      let test = new Date();

      this.form.reset();
      this.fileupload.clear();
    });
  }

  onTabChange(event) {
    this.messageService.add({ severity: 'info', summary: 'Tab Expanded', detail: 'Index: ' + event.index });
  }

}
