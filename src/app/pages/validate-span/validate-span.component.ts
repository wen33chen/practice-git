import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm, FormArray } from '@angular/forms';

@Component({
  selector: 'app-validate-span',
  templateUrl: './validate-span.component.html',
  styleUrls: ['./validate-span.component.scss']
})
export class ValidateSpanComponent implements OnInit, OnChanges {

  @Input() formgroup: FormGroup;
  @Input() name: string;
  @Input() submited: boolean;
  @Input() message: string;
  @Input() index: number;
  constructor() { }

  private validateHtml = '';
  ngOnInit() {
    this.formgroup.valueChanges.subscribe(changes => {
      if (this.submited) {
        this.appendMessage();
      }
    });


  }

  ngOnChanges(changes: SimpleChanges): void {


    console.log("changes", changes);
    if (changes.submited && !changes.submited.firstChange) {
      if (!changes.submited.currentValue) {
        this.validateHtml = '';
      } else {
        this.appendMessage();
      }
    }
  }
  private appendMessage() {
    if (this.formgroup.controls[this.name] instanceof FormArray) {
      let controlArray = this.formgroup.controls[this.name];
      let control = controlArray['controls'][this.index];
      if (control && control.errors) {
        this.validateHtml = this.message || control.errors.returnMessage;
      } else {
        this.validateHtml = "";
      }
    } else {
      let control = this.formgroup.controls[this.name];
      if (control && control.errors) {
        this.validateHtml = this.message || control.errors.returnMessage;
      } else {
        this.validateHtml = "";
      }
    }

  }
}
