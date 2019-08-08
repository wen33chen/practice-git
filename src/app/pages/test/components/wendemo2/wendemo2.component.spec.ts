import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WenDemo2Component } from './wendemo2.component';

describe('Test3Component', () => {
  let component: WenDemo2Component;
  let fixture: ComponentFixture<WenDemo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WenDemo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WenDemo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
