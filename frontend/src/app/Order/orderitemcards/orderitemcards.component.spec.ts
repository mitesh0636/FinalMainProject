import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderitemcardsComponent } from './orderitemcards.component';

describe('OrderitemcardsComponent', () => {
  let component: OrderitemcardsComponent;
  let fixture: ComponentFixture<OrderitemcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderitemcardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderitemcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
