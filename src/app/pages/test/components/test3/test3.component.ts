import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { FileServiceSpring } from '../file.service';
import { TranslateService } from '@ngx-translate/core';
import { NotifyService } from 'app/core/services/notify.service';
import { NotifySeverity } from 'app/core/enums/notify-severity.enum';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { saveAs } from 'file-saver';
import { BlockuiComponent } from '../../../blockui/blockui.component';
import { APiService } from '../../../../core/services/api-mapping.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-test3',
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.scss']
})
export class Test3Component implements OnInit {
  fileList: FileList;
  form: FormGroup;

  @ViewChild(FileUpload, { static: false })
  private fileupload: FileUpload;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private fileServiceSpring: FileServiceSpring,
    private notifyService: NotifyService,
    private translate: TranslateService

  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      uploadName: ['', Validators.required],
      files: this.fb.array([], Validators.required)
    });
  }

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
    this.fileServiceSpring.post(formData.files, formData.uploadName).subscribe(_ => {
      this.notifyService.notify(
        NotifySeverity.success,
        generalLang['success'],
        generalLang['successUpdatefile']
      );
      var test = new Date();

      this.form.reset();
      this.fileupload.clear();
    });
  }

  getApi2() {
    var header = new HttpHeaders({});
    //'Authorizatio': localStorage.getItem('spring'),

    // new HttpHeaders()
    //   .set('Authorizatio', localStorage.getItem('spring'))
    //   .set('X-Skip-Interceptor', '');

    this.http.post<any>("/XXT00100/AuthButton", null, { headers: header, responseType: 'json' }).subscribe((response) => {
      console.log(response, "response");
    });
  }

  getApi() {

    // new HttpHeaders()
    //   .set('Authorizatio', localStorage.getItem('spring'))
    //   .set('X-Skip-Interceptor', '');

    this.http.post<any>("/XXT00100/insertButton", null, { responseType: 'json' }).subscribe((response) => {
      console.log(response, "response");
    });
  }


  getPdf() {
    const springurl = '/getpdf';




    // new HttpHeaders()
    //   .set('Authorizatio', localStorage.getItem('spring'))
    //   .set('X-Skip-Interceptor', '');

    this.http.post<any>(springurl, null, { responseType: 'blob' as 'json' }).subscribe((response) => {
      let file = new Blob([response], { type: 'application/pdf' });

      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);//缺參數
    });


  }

  downloadPdf() {
    const springurl = '/getpdf'


    this.http.post<any>(springurl, null, { responseType: 'blob' as 'json' }).subscribe((response) => {
      let file = new Blob([response], { type: 'application/pdf' });

      //var fileURL = URL.createObjectURL(file);
      saveAs(file, 'text.pdf');
    });
  }
}
