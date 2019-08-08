import { Injectable } from '@angular/core';
import { BlockuiComponent } from './blockui.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlockServiceService {

  constructor() { }

  public document: boolean = false;

  public count: number = 0;

  public status: boolean;

  ngOnChanges() {
    this.status = Boolean(this.document || this.count);
  }

}
