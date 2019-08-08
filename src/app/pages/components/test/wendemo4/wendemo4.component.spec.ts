import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wendemo4Component } from './wendemo4.component';

describe('Wendemo4Component', () => {
  let component: Wendemo4Component;
  let fixture: ComponentFixture<Wendemo4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wendemo4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wendemo4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
