import { Component, OnInit } from '@angular/core';
import { TCustomer } from '../../interfaces/tcustomer';
import { DemoA0Z001Service } from '../../services/demo-a0z001.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-demoa00800',
  templateUrl: './demoa00800.component.html',
  styleUrls: ['./demoa00800.component.scss']
})
export class Demoa00800Component implements OnInit {

  tableData1: TCustomer[];
  displayDialog: boolean;
  cols: any[];
  cust: TCustomer = {};
  selectedCust: TCustomer;
  newCust: boolean;
  frozenCars: TCustomer[];

  // for add row
  rowAddId: any;
  rowAddCustomerId: any;
  rowAddBirthday: any;
  rowAddName: any;
  rowAddSex: any;

  constructor(
    private z001Service: DemoA0Z001Service,
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

  rowAdd() {
    const newRow = {
      id: this.rowAddId,
      customerId: this.rowAddCustomerId,
      birthday: this.rowAddBirthday,
      name: this.rowAddName,
      sex: this.rowAddSex
    };
    const custs = [...this.tableData1];
    custs.push(newRow);
    this.tableData1 = custs;
    console.log('rowAdd');
    console.table(this.tableData1);
  }

  getData() {
    this.z001Service.getCusts().subscribe(resp => { this.tableData1 = resp; });
  }

  showDialogToAdd() {
    this.newCust = true;
    this.cust = {};
    this.displayDialog = true;
  }

  save() {
    const custs = [...this.tableData1];
    if (this.newCust) {
      custs.push(this.cust);
    } else {
      custs[this.tableData1.indexOf(this.selectedCust)] = this.cust;
    }

    this.tableData1 = custs;
    this.cust = null;
    this.displayDialog = false;
  }

  delete() {
    const index = this.tableData1.indexOf(this.selectedCust);
    this.tableData1 = this.tableData1.filter((val, i) => i != index);
    this.cust = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newCust = false;
    this.cust = this.cloneCar(event.data);
    this.displayDialog = true;
  }

  cloneCar(c: TCustomer): TCustomer {
    const cust = {};
    for (const prop in c) {
      cust[prop] = c[prop];
    }
    return cust;
  }

}
