import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParedComponent } from './pared.component';

describe('ParedComponent', () => {
  let component: ParedComponent;
  let fixture: ComponentFixture<ParedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
