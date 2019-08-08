import { Component, OnChanges } from '@angular/core';
import { BlockServiceService } from './block-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blockui',
  templateUrl: './blockui.component.html',
  styleUrls: ['./blockui.component.scss']
})
export class BlockuiComponent {
  constructor(private blockServiceService: BlockServiceService) { }
}
