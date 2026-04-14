import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdermainComponent } from './ordermain.component';

describe('OrdermainComponent', () => {
  let component: OrdermainComponent;
  let fixture: ComponentFixture<OrdermainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdermainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdermainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
