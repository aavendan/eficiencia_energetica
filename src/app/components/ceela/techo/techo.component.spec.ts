import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechoComponent } from './techo.component';

describe('TechoComponent', () => {
  let component: TechoComponent;
  let fixture: ComponentFixture<TechoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
