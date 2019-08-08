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

import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
@Directive({
  selector: '[decimalFormat]'
})
export class decimalFormat implements OnInit {

  constructor(private sanitizer: DomSanitizer, private currencyPipe: CurrencyPipe) {}

  @HostListener('blur', ['$event.target'])
  onBlur(target: any) {
    target.value = this.currencyPipe.transform(target.value, "TWD", "symbol");
  }

  @HostListener('focus', ['$event.target'])
  onFocus(target: any) {
    target.value = target.value.replace(/[$,A-Za-z]/g, "");
  }

  ngOnInit(): any {
    console.log('decimal');

  }

}
