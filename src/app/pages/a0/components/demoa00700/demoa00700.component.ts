import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-demoa00700',
  templateUrl: './demoa00700.component.html',
  styleUrls: ['./demoa00700.component.scss']
})
export class Demoa00700Component implements OnInit {

  @ViewChild('fieldName1',{static:true})
  fieldName1: any;

  money:String;
  price:String;
  cur:String;
  constructor(private currencyPipe:CurrencyPipe) { }

  ngOnInit() {

  }


  inputBlur($event){

    $event.target.value=this.currencyPipe.transform($event.target.value, "TWD", "symbol");
  }
  clearText($event){

     $event.target.value=$event.target.value.replace(/[$,A-Za-z]/g, "");
  }
}
