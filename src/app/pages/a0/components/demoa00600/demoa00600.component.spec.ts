import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demoa00600Component } from './demoa00600.component';

describe('Demoa00600Component', () => {
  let component: Demoa00600Component;
  let fixture: ComponentFixture<Demoa00600Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demoa00600Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demoa00600Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
