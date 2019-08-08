import { Component, OnInit } from '@angular/core';
import { TCustomer } from '../../interfaces/tcustomer';
import { DemoA0Z001Service } from '../../services/demo-a0z001.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-demoa00300',
  templateUrl: './demoa00300.component.html',
  styleUrls: ['./demoa00300.component.scss']
})
export class Demoa00300Component implements OnInit {

  tableData1: TCustomer[]; // 上方表繫結的資料
  tableData2: TCustomer[]; // 下方表繫結的資料
  cols: any[];
  radioSelected: TCustomer; // 下方表單選對應的繫結資料
  checkboxSelected: TCustomer[]; // 上方表多選對應的繫結資料
  displayDialog: boolean;
  cust: TCustomer = {};
  selectedCust: TCustomer;
  newCust: boolean;
  colsCusts: any[]; // 動態Header
  selectedColumns: any[]; // 動態Header

  // 修改按鈕使用物件
  clonedCusts: { [s: string]: TCustomer; } = {};

  constructor(
    private z001Service: DemoA0Z001Service,
    private messageService: MessageService,
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
    this.colsCusts = [
      { field: 'id', header: 'id' },
      { field: 'customerId', header: 'customerId' },
      { field: 'birthday', header: 'birthday' },
      { field: 'name', header: 'name' },
      { field: 'sex', header: 'sex' }
    ];
    this.selectedColumns = this.colsCusts;
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
    }
    this.tableData1 = custs;
    this.cust = null;
    this.displayDialog = false;
  }

  getData() {
    this.z001Service.getCusts().subscribe(resp => { this.tableData1 = resp; this.tableData2 = resp; });
    console.log(this.z001Service.getCusts()); //TODO try RXJS
  }
  radioClick() {
    console.log(this.radioSelected);
  }

  onRowEditInit(cust: TCustomer) {
    this.clonedCusts[cust.customerId] = { ...cust };
  }

  onRowEditSave(cust: TCustomer) {
    // 因為雙向繫結的原因，所以資料實際上在修改時已經存回this.data中了
    delete this.clonedCusts[cust.customerId];
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data is updated' });
    console.table(cust);
    console.table(this.tableData1);
  }

  onRowEditCancel(cust: TCustomer, index: number) {
    // 將clonedCusts中原始的cust資料放回this.data中，避免因使用者有修改欄位值而變動到this.data的資料
    this.tableData1[index] = this.clonedCusts[cust.customerId];
    delete this.clonedCusts[cust.customerId];
  }

  addRow() {
    const newRow = {
      id: 'A129439835',
      customerId: 2019061400,
      birthday: '2001-08-01',
      name: '陳琮文',
      sex: 'M'
    };
    const custs = [...this.tableData2];
    custs.push(newRow);
    this.tableData2 = custs;
    console.log('addRow');
    console.table(this.tableData2);
  }
}
