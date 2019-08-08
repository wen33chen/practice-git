import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demoa00800Component } from './demoa00800.component';

describe('Demoa00800Component', () => {
  let component: Demoa00800Component;
  let fixture: ComponentFixture<Demoa00800Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demoa00800Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demoa00800Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
