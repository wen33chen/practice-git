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
import { FormGroup } from '@angular/forms';
import { OnChanges, SimpleChanges } from '@angular/core';
@Directive({
  selector: '[validateError]'
})
export class ValidateError implements OnInit,OnChanges {


  constructor(private sanitizer: DomSanitizer) {}

  @Input() fooo: FormGroup;

  ngOnInit(): any {
    console.log('validate');
    console.log(this.fooo)
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("change");
  }


}
