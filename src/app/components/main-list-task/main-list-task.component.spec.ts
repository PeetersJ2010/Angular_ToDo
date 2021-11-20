import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainListTaskComponent } from './main-list-task.component';

describe('MainListTaskComponent', () => {
  let component: MainListTaskComponent;
  let fixture: ComponentFixture<MainListTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainListTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainListTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
