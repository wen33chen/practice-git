import { Component, ChangeDetectorRef } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { Cars } from '../../interfaces/cars';
import { Demoa00100Service } from '../../services/demoa00100.service';

@Component({
  selector: 'app-car-component',
  templateUrl: './demoa00101.component.html',
})
export class Demoa00101Component {

  cars: Cars[];

  constructor(
    private demoa00100Service: Demoa00100Service,
    private ref: DynamicDialogRef    //private config: DynamicDialogConfig
    ) { }

  ngOnInit() {
    this.demoa00100Service.getCars().subscribe(resp => { this.cars = resp; });
  }

  selectCar(car: Cars) {
    this.ref.close(car);
  }

}
