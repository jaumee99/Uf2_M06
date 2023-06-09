import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompatibilitatComponent } from './compatibilitat.component';

describe('CompatibilitatComponent', () => {
  let component: CompatibilitatComponent;
  let fixture: ComponentFixture<CompatibilitatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompatibilitatComponent]
    });
    fixture = TestBed.createComponent(CompatibilitatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
