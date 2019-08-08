
import { Component, OnInit, OnChanges, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PhoneNumberValidator } from '../../../../shared/PhoneNumberValidator';
import { ValidateError } from '../../../../shared/directives/validateError';
import { appInit } from '../../../../app.module';
import { validatorValidator } from '../../../../shared/ValidateValidator';

@Component({
  selector: 'app-demoa00900',
  templateUrl: './demoa00900.component.html',
  styleUrls: ['./demoa00900.component.scss']
})
export class Demoa00900Component implements OnInit {
  form: FormGroup;
  data: any;
  issubmit = false;
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', [

        validatorValidator(["required", "fullType"])
      ]],
      price: ['', [

        validatorValidator(["required"], function () { return { returnMessage: "自定義檢核" } }),

      ]

      ], nickname: this.fb.array([
        ['', [validatorValidator(["required"])
        ]], ['']
      ]), radio: ['', [

        validatorValidator(["required"]),

      ]], validatenumber: ['', [

        validatorValidator(["number"]),

      ]], chinese: ['', [

        validatorValidator(["chinese"]),

      ]], phone: ['', [
        validatorValidator(["phone"]),
      ]]
      , ROCID: ['', [
        validatorValidator(["ROCID"]),
      ]]
      , UniSN: ['', [
        validatorValidator(["UniSN"]),
      ]], digits: ['', [
        validatorValidator(["digits"]),
      ]], email: ['', [
        validatorValidator(["email"]),
      ]], englishOrInteger: ['', [
        validatorValidator(["englishOrInteger"]),
      ]], halfType: ['', [
        validatorValidator(["halfType"]),
      ]], english: ['', [
        validatorValidator(["english"]),
      ]], chineseOrEnglish: ['', [
        validatorValidator(["chineseOrEnglish"]),
      ]], chineseOrEnglishOrBlank: ['', [
        validatorValidator(["chineseOrEnglishOrBlank"]),
      ]], number: ['', [
        validatorValidator(["number"]),
      ]]




    });



    this.data = {
      name: 'alansid',
      nickname: ['87', '帥哥'],
      price: '1000'
    }
    //onload時不要檢核


    //this.form.reset(this.data);
  }

  test() {
    console.log(this.form.get('nickname'))
    console.log(this.form);
  }

  @ViewChildren(ValidateError) validate;

  clearSubmit() {
    this.issubmit = false;
  }
  onSubmi() {
    // Object.keys(this.form.controls).forEach(field => { // {1}
    //   const control = this.form.get(field);
    //   console.log(control,'control');            // {2}
    //   control.markAsTouched({ onlySelf: true });       // {3}
    // });

    console.log(this.validate);
    console.log(this.validate.first);
    console.log(this.validate.changes);
    this.issubmit = true;
    // this.form.markAllAsTouched();
    //this.validateAllFormFields(this.form);
    if (!this.form.valid) {
      return false;
    }
    console.log('送出表單!!');

  }
}
