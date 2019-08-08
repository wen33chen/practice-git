import { Component, OnInit } from '@angular/core';
import { MessageService, DialogService, ConfirmationService, SelectItem, MenuItem, SortEvent } from 'primeng/api';
import { CarsService } from '../../services/cars.service';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Cars } from '../../cars';
import { TCustomer } from '../../tcustomer';
import { CarsListDemo } from '../carslistdemo';

@Component({
  selector: 'app-wendemo0',
  templateUrl: './wendemo0.component.html',
  styleUrls: ['./wendemo0.component.scss'],
  providers: [DialogService]
})
export class Wendemo0Component implements OnInit {
  private cols: any[];
  colsCusts: any[];
  private brands: SelectItem[];
  private priceTimeout: any;
  private tableData: Cars[];
  private custTable: TCustomer[];
  selectedCust1: TCustomer;
  selectedCusts1: TCustomer[];
  selectedColumns: any[];
  clonedTCustomer: { [s: string]: TCustomer; } = {};
  dialogDisplay = false;
  dialogText: string;
  selectedCar2: Cars;
  tmp = 'manufacturer';
  rowsTable = 10;
  buttonItems: MenuItem[];
  buttonItems2: MenuItem[];
  menuItems: MenuItem[];

  constructor(
    private messageService: MessageService,
    private carService: CarsService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private router: Router,
    public dataService: DataService
  ) { }

  ngOnInit() {

    this.buttonItems = [
      {
        label: '改變欄名', icon: 'pi pi-refresh', command: () => {
          this.change111();
        }
      },
      {
        label: '改變rows', icon: 'pi pi-times', command: () => {
          this.changeRows();
        }
      }
    ];

    this.buttonItems2 = [
      {
        label: 'ConfirmDialog', icon: 'pi pi-refresh', command: () => {
          this.confirm();
        }
      },
      {
        label: 'SimpleDialog', icon: 'pi pi-times', command: () => {
          this.showDialog();
        }
      }
    ];

    this.cols = [
      { field: 'manufacturer', header: 'manufacturer' },
      { field: 'type', header: 'type' },
      { field: 'minPrice', header: 'minPrice' },
      { field: 'price', header: 'price' }
    ];
    this.brands = [
      { label: 'Audi', value: 'Audi' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Fiat', value: 'Fiat' },
      { label: 'Honda', value: 'Honda' },
      { label: 'Jaguar', value: 'Jaguar' },
      { label: 'Mercedes', value: 'Mercedes' },
      { label: 'Renault', value: 'Renault' },
      { label: 'VW', value: 'VW' },
      { label: 'Volvo', value: 'Volvo' }
    ];

    this.colsCusts = [
      { field: 'id', header: 'id' },
      { field: 'customerId', header: 'customerId' },
      { field: 'birthday', header: 'birthday' },
      { field: 'name', header: 'name' },
      { field: 'sex', header: 'sex' }
    ];
    this.dialogText = 'The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter\'s wedding. His beloved son Michael has just come home from the war, but does not intend to become part of his father\'s business. Through Michael\'s life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.';
    this.getcusts();
    this.selectedColumns = this.colsCusts;
  }

  get data(): string {
    return this.dataService.serviceData;
  }
  set data(value: string) {
    this.dataService.serviceData = value;
  }

  changeRows() {
    if (this.rowsTable !== 5) {
      this.rowsTable = 5;
    } else {
      this.rowsTable = 10;
    }
  }

  toT3() {
    const navigationExtras: NavigationExtras = {
      queryParams: { 'thing': '111' },
      replaceUrl: true,
      fragment: 'top'
    };
    this.router.navigate(['/test/t3'], navigationExtras);
  }

  toT4() {
    this.router.navigate(['/test/t4']);
  }

  selectCarWithButton(cars: Cars) {
    this.selectedCar2 = cars;
    this.messageService.add({ severity: 'info', summary: 'Car Selected', detail: '選擇: ' + cars.manufacturer + '/' + cars.type });
  }

  changeDialogText() {
    this.dialogText = 'I have changed';
  }

  popup() {
    const ref = this.dialogService.open(CarsListDemo, {
      header: 'Choose a Car',
      width: '70%',
      contentStyle: { 'max-height': '350px', 'overflow': 'auto' },
      data: { 'key1': 'value111', 'key2': 'value222' }
    });
    ref.onClose.subscribe((car: Cars) => {
      if (car) {
        this.messageService.add({ severity: 'info', summary: 'Car Selected', detail: 'Manufacturer:' + car.manufacturer });
      }
    });
  }

  getcusts() {
    this.carService.getCusts().subscribe(resp => { this.custTable = resp; });
  }

  getcars() {
    this.carService.getCarsSmall().subscribe(resp => { this.tableData = resp; this.getBrands(); });
  }

  change111() {
    if (this.tmp !== 'Brand') {
      this.tmp = 'Brand';
    } else {
      this.tmp = 'manufacturer';
    }
  }

  getBrands() {
    const tmp = [];
    this.tableData.forEach(element => {
      if (!tmp.includes(element.manufacturer)) {
        tmp.push(element.manufacturer);
      }
    });
    tmp.sort();
    this.brands = [];
    tmp.forEach(element => {
      this.brands.push({ label: element, value: element });
    });
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: '耶!', detail: '你選了同意' });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected.' });
      }
    });
  }

  showDialog() {
    this.dialogDisplay = true;
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      const value1 = data1[event.field];
      const value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) {
        result = -1;
      } else if (value1 != null && value2 == null) {
        result = 1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else {
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      }

      return (event.order * result);
    });
  }

  onPriceChange(event, dt) {
    if (this.priceTimeout) {
      clearTimeout(this.priceTimeout);
    }

    this.priceTimeout = setTimeout(() => {
      dt.filter(event.value, 'price', 'gt');
    }, 250);
  }

  onRowEditInit(cust: TCustomer) {
    this.clonedTCustomer[cust.id] = { ...cust };
    console.log('aaa');
    console.table(this.clonedTCustomer);
  }

  onRowEditSave(cust: TCustomer) {
    if (cust.name != '') {
      delete this.clonedTCustomer[cust.id];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Car is updated' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Year is required' });
    }
  }

  onRowEditCancel(cust: TCustomer, index: number) {
    this.custTable[index] = this.clonedTCustomer[cust.id];
    delete this.clonedTCustomer[cust.id];
  }

}
