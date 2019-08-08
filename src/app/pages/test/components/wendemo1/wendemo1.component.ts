import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { TCustomer } from '../../tcustomer';
import { DatePipe } from '@angular/common';
import { CalendarService } from '../../services/calendar.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-wendemo1',
  templateUrl: './wendemo1.component.html',
  styleUrls: ['./wendemo1.component.scss']
})
export class Wendemo1Component implements OnInit {

  private tableData: TCustomer[];
  displayDialog: boolean;
  selectedCust: TCustomer;
  newCust: boolean;
  cust: TCustomer;
  custs: TCustomer[];
  cols: any[];
  valueDate: Date = new Date();
  tw: any;
  placeHolderDate = '2019/03/24';
  clonedCusts: { [s: string]: TCustomer; } = {};
  thePassingParam: any;

  constructor(
    private carService: CarsService,
    private calendarService: CalendarService,
    private messageService: MessageService,
    private datepipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.valueDate.setDate(this.valueDate.getDate() - 5);
    this.tw = this.calendarService.getTWLocales();
    this.getTableData();
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'customerId', header: 'customerId' },
      { field: 'birthday', header: 'birthday' },
      { field: 'name', header: 'name' },
      { field: 'sex', header: 'sex' }
    ];
    // 取得test1傳遞過來的參數
    this.thePassingParam = this.activatedRoute.snapshot.queryParams['thing'];
    console.log('傳遞過來的thing', this.thePassingParam);
    console.log('DataService中的資料', this.data);
  }

  get data(): string {
    return this.dataService.serviceData;
  }
  set data(value: string) {
    this.dataService.serviceData = value;
  }

  addRow() {
    const newCust = {
      id: 'A129439835',
      customerId: '20190614009',
      birthday: '2001-08-01',
      name: '陳琮文',
      sex: 'M'
    };
    this.tableData.push(newCust);
  }

  getTableData() {
    this.carService.getCusts().subscribe(resp => { this.tableData = resp; });
    console.log(this.carService.getCusts()); //TODO try RXJS
  }

  showDate() {
    console.log(this.valueDate);
    console.log(this.datepipe.transform(this.valueDate, 'yyyyMMdd'));
    this.messageService.add({ severity: 'success', detail: this.valueDate.toDateString() });
  }

  onRowSelect(event) {
    console.log(event.data);
  }

  onRowEditInit(cust: TCustomer) {
    this.clonedCusts[cust.customerId] = { ...cust };
  }

  onRowEditSave(cust: TCustomer) {
    // 因為雙向繫結的原因，所以資料實際上在修改時已經存回this.data中了
    delete this.clonedCusts[cust.customerId];
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data is updated' });
    console.table(cust);
    //console.table(this.data);
  }

  onRowEditCancel(cust: TCustomer, index: number) {
    // 將clonedCusts中原始的cust資料放回this.data中，避免因使用者有修改欄位值而變動到this.data的資料
    this.tableData[index] = this.clonedCusts[cust.customerId];
    delete this.clonedCusts[cust.customerId];
  }
}
