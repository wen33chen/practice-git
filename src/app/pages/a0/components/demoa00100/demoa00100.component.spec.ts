import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demoa00100Component } from './demoa00100.component';

describe('Demoa00100Component', () => {
  let component: Demoa00100Component;
  let fixture: ComponentFixture<Demoa00100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demoa00100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demoa00100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
