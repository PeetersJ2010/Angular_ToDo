import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTasksComponent } from './header-tasks.component';

describe('HeaderTasksComponent', () => {
  let component: HeaderTasksComponent;
  let fixture: ComponentFixture<HeaderTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
