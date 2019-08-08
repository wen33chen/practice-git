import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  HostBinding
} from '@angular/core';
import { from, combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { FeatureService } from 'app/pages/feature/services/feature.service';
import { FeatureService2 } from '../../pages/feature/services/feature.service.1';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Directive({
  selector: '[appFeatureHidden]'
})
export class FeatureAuthHidden implements OnInit {
  @HostBinding('style.display')
  display: string;
  elRef: ElementRef;
  @Input() id: string;


  constructor(private sanitizer: DomSanitizer, private featureService: FeatureService2, elRef: ElementRef,private route: ActivatedRoute) {
    this.elRef = elRef;
  }

  ngOnInit(): any {
    const menucode = this.route.snapshot.data['menuCode'];
    console.log(menucode);


    console.log('Thru FeatureAuthDirective22');
    this.featureService.roleFeatureCodes$
      .pipe(
      map(codes => {
        if(codes[menucode]){
          console.log(codes[menucode], 'ttttttttttt');
          return codes[menucode].includes(this.id);

        }else{
          return true;
        }}),
      tap(isPermission => {
        if (!isPermission) {
          this.display = 'none';

        }
      })
      )
      .subscribe();
  }


}
