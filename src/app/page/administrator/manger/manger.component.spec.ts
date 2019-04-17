import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangerComponent } from './manger.component';

describe('MangerComponent', () => {
  let component: MangerComponent;
  let fixture: ComponentFixture<MangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
