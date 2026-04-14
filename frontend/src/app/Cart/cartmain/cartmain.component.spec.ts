import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartmainComponent } from './cartmain.component';

describe('CartmainComponent', () => {
  let component: CartmainComponent;
  let fixture: ComponentFixture<CartmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartmainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
