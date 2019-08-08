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
import { ActivatedRoute } from '@angular/router';
@Directive({
  selector: '[appFeatureAuth]'
})
export class FeatureAuthDirective implements OnInit {
  @HostBinding('disabled')
  disabled: boolean;

  @Input() id: string;

  constructor(private featureService: FeatureService2,private route: ActivatedRoute) { }

  ngOnInit(): any {
    const menucode = this.route.snapshot.data['menuCode'];
    console.log('Thru FeatureAuthDirective');
    this.featureService.roleFeatureCodes$
      .pipe(
        map(codes => {
          if(codes[menucode]){
            return codes[menucode].includes(this.id)
          }else{
            return true;
          }}
          ),
        tap(isPermission => { (this.disabled = !isPermission); console.log(isPermission, 'Button Auth Checked'); })
      )
      .subscribe();
  }

}
