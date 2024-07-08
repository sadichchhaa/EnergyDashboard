import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStatComponent } from './chart-stat.component';

describe('ChartStatComponent', () => {
  let component: ChartStatComponent;
  let fixture: ComponentFixture<ChartStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
