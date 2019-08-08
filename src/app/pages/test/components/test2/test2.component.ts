import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RolefeatureService } from '../../../rolefeature/services/rolefeature.service';
import { FeatureService2 } from '../../../feature/services/feature.service.1';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Cars } from '../../cars';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component implements OnInit {
  model = new FormGroup({
    featureCode: new FormControl(null, Validators.required),
    featureName: new FormControl(null, Validators.required),
    isActive: new FormControl(true, Validators.required),
    isAllowAssignRoleUse: new FormControl(false, Validators.required),
    featureGroupId: new FormControl(null, Validators.required),
    sort: new FormControl(null, Validators.required)
  });
  constructor(private rolefeatureService: FeatureService2,private http:HttpClient) { }

  table$: Cars[];
  ngOnInit() {
  }

  query(){

    const springurl = 'http://localhost:8080/getcar';

        var headers = new HttpHeaders().set('Content-Type', 'application/josn;charset=utf-8').set('Authorizatio',localStorage.getItem('spring')).set('X-Skip-Interceptor', '');
        //headers.set('X-Skip-Interceptor', '');
        var test = this.http.post<any>(springurl, null, { headers: headers }).subscribe(resp => this.table$ = resp);
  }
}
