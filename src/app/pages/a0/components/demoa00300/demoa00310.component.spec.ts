import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demoa00310Component } from './demoa00310.component';

describe('Demoa00310Component', () => {
  let component: Demoa00310Component;
  let fixture: ComponentFixture<Demoa00310Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demoa00310Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demoa00310Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
