import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitModalComponent } from './limit-modal.component';

describe('LimitModalComponent', () => {
  let component: LimitModalComponent;
  let fixture: ComponentFixture<LimitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
