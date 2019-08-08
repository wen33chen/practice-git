import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wendemo1Component } from './wendemo1.component';

describe('Test3Component', () => {
  let component: Wendemo1Component;
  let fixture: ComponentFixture<Wendemo1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wendemo1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wendemo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
