import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateSpanComponent } from './validate-span.component';

describe('ValidateSpanComponent', () => {
  let component: ValidateSpanComponent;
  let fixture: ComponentFixture<ValidateSpanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateSpanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
