import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomercardComponent } from './customercard.component';

describe('CustomercardComponent', () => {
  let component: CustomercardComponent;
  let fixture: ComponentFixture<CustomercardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomercardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomercardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
