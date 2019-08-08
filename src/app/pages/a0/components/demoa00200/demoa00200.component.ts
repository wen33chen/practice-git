import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { Demoa00100Service } from '../../services/demoa00100.service';
import { Cars } from '../../interfaces/cars';

@Component({
  selector: 'app-demoa00200',
  templateUrl: './demoa00200.component.html',
  styleUrls: ['./demoa00200.component.scss']
})
export class Demoa00200Component implements OnInit {

  buttonItems: MenuItem[];
  rowsTable = 10;
  tmp = 'manufacturer';
  private brands: SelectItem[];
  private tableData: Cars[];
  private priceTimeout: any;

  constructor(
    private demoa00100Service: Demoa00100Service,
  ) { }

  ngOnInit() {
    this.buttonItems = [
      {
        label: '改變欄名', icon: 'pi pi-refresh', command: () => {
          this.changeColumnsName();
        }
      },
      {
        label: '清除資料', icon: 'pi pi-times', command: () => {
          this.tableData = [];
        }
      }
    ];

  }

  getcars() {
    this.demoa00100Service.getCars().subscribe(resp => { this.tableData = resp; this.getBrands(); });
  }

  changeRows() {
    if (this.rowsTable !== 5) {
      this.rowsTable = 5;
    } else {
      this.rowsTable = 10;
    }
  }

  changeColumnsName() {
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

  onPriceChange(event, dt) {
    if (this.priceTimeout) {
      clearTimeout(this.priceTimeout);
    }

    this.priceTimeout = setTimeout(() => {
      dt.filter(event.value, 'price', 'gt');
    }, 250);
  }

}
