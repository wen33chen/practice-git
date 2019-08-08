import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wendemo3Component } from './wendemo3.component';

describe('Wendemo3Component', () => {
  let component: Wendemo3Component;
  let fixture: ComponentFixture<Wendemo3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wendemo3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wendemo3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
