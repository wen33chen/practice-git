import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { PageInfo } from '../../../../shared/swagger-gen';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-demoa00600',
  templateUrl: './demoa00600.component.html',
  styleUrls: ['./demoa00600.component.scss']
})
export class Demoa00600Component implements OnInit {

  constructor(private messageService: MessageService, private http: HttpClient, private route: ActivatedRoute, private router: Router) {

  }

  data: any = {
    name: 'Will',
    tel: '0988-888888',
    money: 1000
  };




  ngOnInit() {


    //this.test();
  }

  onSubmit(form: NgForm) {


    console.log('送出表單!!');

  }


}
