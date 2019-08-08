import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { TCustomer } from '../../tcustomer';

@Component({
  selector: 'app-wendemo2',
  templateUrl: './wendemo2.component.html',
  styleUrls: ['./wendemo2.component.scss']
})
export class WenDemo2Component implements OnInit {

  private data: TCustomer[];
  cols: any[];
  radioSelected: TCustomer;
  checkboxSelected: TCustomer[];
  displayDialog: boolean;
  cust: TCustomer = {};
  selectedCust: TCustomer;
  newCust: boolean;

  constructor(
    private carService: CarsService,
  ) { }

  ngOnInit() {
    this.getData();
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'customerId', header: 'customerId' },
      { field: 'birthday', header: 'birthday' },
      { field: 'name', header: 'name' },
      { field: 'sex', header: 'sex' }
    ];
  }

  showDialogToAdd() {
    this.newCust = true;
    this.cust = {};
    this.displayDialog = true;
  }

  save() {
    const custs = [...this.data];
    if (this.newCust) {
      custs.push(this.cust);
    }
    // } else {
    //   custs[this.custs.indexOf(this.selectedCust)] = this.cust;
    // }

    this.data = custs;
    this.cust = null;
    this.displayDialog = false;
  }

  getData() {
    this.carService.getCusts().subscribe(resp => { this.data = resp; });
    console.log(this.carService.getCusts()); //TODO try RXJS
  }
  radioClick() {
    console.log(this.radioSelected);
  }
}
