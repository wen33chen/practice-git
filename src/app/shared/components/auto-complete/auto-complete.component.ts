

import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.dataTemp=[];
  }

  @Input() data: any[];
  @Input() placeholder: string;
  @Input() default: string;
  @Input() key: string;
  @Output() complete = new EventEmitter();
  value = this.default || '';
  dataTemp: any[];
  constructor() { }

  ngOnInit() {
  }
  searchCar($event) {

    let query = $event.query;
    console.log(query)
    this.dataTemp = [];
    if (this.key) {
      for (let oneData of this.data) {
        if (oneData[this.key].includes(query)) {
          this.dataTemp.push(oneData[this.key]);
        }

      }
    } else {
      this.dataTemp = this.data.filter(function (element) {
        if (element.includes(query)) {
          return element.manufacturer;
        }

      });
    }


  }

  captureId(event: any) {
    console.log(event)

    this.complete.emit(event);

  }
}
