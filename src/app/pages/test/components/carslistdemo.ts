import { Component } from '@angular/core';
import { Cars } from '../cars';
import { CarsService } from '../services/cars.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

@Component({
  template: `
        <p-table [value]="cars" [paginator]="true" [rows]="5" [responsive]="true">
            <ng-template pTemplate="header">
                <tr>
                    <th>Manufacturer</th>
                    <th>Type</th>
                    <th>Min Price</th>
                    <th>Price</th>
                    <th style="width:4em"></th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-car>
                <tr>
                    <td><span class="ui-column-title">Vin</span>{{car.manufacturer}}</td>
                    <td><span class="ui-column-title">Year</span>{{car.type}}</td>
                    <td><span class="ui-column-title">Brand</span>{{car.minPrice}}</td>
                    <td><span class="ui-column-title">Color</span>{{car.price}}</td>
                    <td>
                        <button pButton icon="pi pi-search" (click)="selectCar(car)"></button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    `
})
export class CarsListDemo {

  cars: Cars[];

  constructor(
    private carService: CarsService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
    ) { }

  ngOnInit() {
    this.carService.getCarsSmall().subscribe(resp => { this.cars = resp; });
    console.log(this.config.data['key1']);
  }

  selectCar(car: Cars) {
    this.ref.close(car);
  }

}
