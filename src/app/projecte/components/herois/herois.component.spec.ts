import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroisComponent } from './herois.component';

describe('HeroisComponent', () => {
  let component: HeroisComponent;
  let fixture: ComponentFixture<HeroisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroisComponent]
    });
    fixture = TestBed.createComponent(HeroisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
