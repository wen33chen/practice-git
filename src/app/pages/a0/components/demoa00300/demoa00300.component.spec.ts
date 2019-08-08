import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demoa00300Component } from './demoa00300.component';

describe('Demoa00300Component', () => {
  let component: Demoa00300Component;
  let fixture: ComponentFixture<Demoa00300Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demoa00300Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demoa00300Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
