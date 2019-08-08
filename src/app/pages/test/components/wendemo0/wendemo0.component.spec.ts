import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wendemo0Component } from './wendemo0.component';

describe('Wendemo0Component', () => {
  let component: Wendemo0Component;
  let fixture: ComponentFixture<Wendemo0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wendemo0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wendemo0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
