import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demoa00401Component } from './demoa00401.component';

describe('Demoa00401Component', () => {
  let component: Demoa00401Component;
  let fixture: ComponentFixture<Demoa00401Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demoa00401Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demoa00401Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
