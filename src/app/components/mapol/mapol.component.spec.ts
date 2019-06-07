import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapolComponent } from './mapol.component';

describe('MapolComponent', () => {
  let component: MapolComponent;
  let fixture: ComponentFixture<MapolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
