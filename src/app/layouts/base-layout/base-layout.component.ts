import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SystemMenuItem } from 'app/core/interfaces/system-menu-item';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/primeng';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { MenuService } from 'app/pages/menu/services/menu.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'app/shared/services/common.service';


@Component({
  selector: 'app-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {
  private menuItems$: Observable<MenuItem[]>;
  private reload$: BehaviorSubject<boolean>;
  @ViewChild('sidebarMenu', { static: false })
  sidebarMenu: PanelMenu;
  // 左邊選單
  sidebarItems: MenuItem[] = [];
  breadItems$: Observable<MenuItem[]>;
  searchKey: string;
  results: string[];
  menudisplay: boolean;

  constructor(
    private menuService: MenuService,
    private translate: TranslateService,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.menudisplay = true;
    this.reload$ = new BehaviorSubject(true);

    // 強制開啟時讀取一次Guard需要的MenuCodes(2019-07-15)
    this.commonService.getMenuCodesByRoleId().subscribe(this.commonService.authMenuCodes$);

    this.menuItems$ = this.reload$.pipe(
      switchMap(() => this.commonService.getMenuItems()),
      map(items => {
        console.log(items, 'BaseLayout gotMenuItems');
        // 轉換系統選單到可用的格式
        const transformItems = (
          systemMenuItems: SystemMenuItem[]
        ): MenuItem[] => {
          return systemMenuItems.map(systemMenuItem => {
            return {
              label: !isNullOrUndefined(systemMenuItem.menuCode)
                ? systemMenuItem.displayText
                : systemMenuItem.displayText,
              routerLink:
                systemMenuItem.menuCode != null &&
                  systemMenuItem.linkUrl != null
                  ? systemMenuItem.linkUrl
                  : '',
              items:
                systemMenuItem.subMenuList &&
                  systemMenuItem.subMenuList.length > 0
                  ? transformItems(systemMenuItem.subMenuList)
                  : null
            };
          });
        };
        return transformItems(items);
      }),
      tap(items => {
        this.sidebarItems = items;

        // Hard Code Example Menu Item

      })
    );

    this.translate.onLangChange.subscribe(this.reload$);

    this.breadItems$ = combineLatest(
      this.menuService.currentPath$,
      this.menuItems$
    ).pipe(
      map(([url, _]) => this.findBreadItems(url, this.sidebarItems)),
      filter(items => items.length > 0)
    );
  }

  autoComplete(event) {
    this.results = this.filterMenuItemBy(event.query).map(x => x.label);
  }

  private filterMenuItemBy(key) {
    return this.expandMenuItem(this.sidebarItems).filter(x =>
      x.label.includes(key)
    );
  }

  private expandMenuItem(items: MenuItem[]): MenuItem[] {
    return items.reduce(
      (pre, curr) =>
        pre.concat(curr, this.expandMenuItem((curr.items || []) as MenuItem[])),
      []
    );
  }
  goSearch(event) {
    if (this.searchKey) {
      const menuItem = this.filterMenuItemBy(this.searchKey)[0];
      if (menuItem) {
        this.sidebarMenu.collapseAll();
        this.sidebarMenu.handleClick(event, menuItem);
        if (menuItem.routerLink) {
          const activatedMenu = this.sidebarItems.find((el: any) => {
            return el.items.some(e => e.routerLink === menuItem.routerLink);
          });
          activatedMenu.expanded = true;
          this.router.navigate([menuItem.routerLink]);
        }
      }
    }
  }

  menuToggle() {
    this.menudisplay = !this.menudisplay;
  }

  findBreadItems(link: string, items: MenuItem[]): MenuItem[] {
    const appendNextBread = (
      findLink: string,
      subItems: MenuItem[],
      path: string[]
    ) => {
      for (const subItem of subItems as MenuItem[]) {
        if (appendBread(findLink, subItem, path).length > 0) {
          return [...path, subItem.label];
        }
      }
      return [];
    };

    const appendBread = (findLink: string, item: MenuItem, path: string[]) => {
      if (item.routerLink === findLink) {
        return [item.label];
      }

      if (item.items && item.items.length > 0) {
        const nextPath = [...path, item.label];
        return appendNextBread(findLink, item.items as MenuItem[], nextPath);
      }

      return [];
    };

    for (const item of items) {
      const path = appendBread(link, item, []);
      if (path.length > 0) {
        return path.map(text => <MenuItem>{ label: text });
      }
    }
    return [];
  }
}
