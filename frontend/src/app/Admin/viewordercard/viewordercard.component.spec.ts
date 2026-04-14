import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewordercardComponent } from './viewordercard.component';

describe('ViewordercardComponent', () => {
  let component: ViewordercardComponent;
  let fixture: ComponentFixture<ViewordercardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewordercardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewordercardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
