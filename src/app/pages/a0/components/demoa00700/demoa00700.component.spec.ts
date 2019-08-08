import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demoa00700Component } from './demoa00700.component';

describe('Demoa00700Component', () => {
  let component: Demoa00700Component;
  let fixture: ComponentFixture<Demoa00700Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demoa00700Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demoa00700Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
