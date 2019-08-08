import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class Test1Component implements OnInit {

  constructor(

  ) { }

  menuItems: MenuItem[];
  background = 'primary';
  ngOnInit() {
    this.menuItems = [
      {
        label: 'Page 1', icon: 'fa fa-fw fa-calendar', routerLink: '/test/t2', command: (event) => {
          console.log(event);
          //event.originalEvent: Browser event
          //event.item: menuitem metadata
        }
      },
      {
        label: 'Page 2', icon: 'fa fa-fw fa-calendar', routerLink: '/test/t3', command: (event) => {
          console.log(event);
          //event.originalEvent: Browser event
          //event.item: menuitem metadata
        }
      },
      {
        label: 'Page 3', icon: 'fa fa-fw fa-book', routerLink: '/test/t3', command: (event) => {
          console.log(event);
          //event.originalEvent: Browser event
          //event.item: menuitem metadata
        }
      }
    ];
  }
}
