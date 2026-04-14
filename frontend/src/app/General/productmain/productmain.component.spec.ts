import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmainComponent } from './productmain.component';

describe('ProductmainComponent', () => {
  let component: ProductmainComponent;
  let fixture: ComponentFixture<ProductmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductmainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
