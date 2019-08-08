import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demoa00400Component } from './demoa00400.component';

describe('Demoa00400Component', () => {
  let component: Demoa00400Component;
  let fixture: ComponentFixture<Demoa00400Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demoa00400Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demoa00400Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
