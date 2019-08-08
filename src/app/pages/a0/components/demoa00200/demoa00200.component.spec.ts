import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demoa00200Component } from './demoa00200.component';

describe('Demoa00200Component', () => {
  let component: Demoa00200Component;
  let fixture: ComponentFixture<Demoa00200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demoa00200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demoa00200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
