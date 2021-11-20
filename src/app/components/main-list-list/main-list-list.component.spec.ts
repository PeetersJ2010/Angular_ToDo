import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainListListComponent } from './main-list-list.component';

describe('MainListListComponent', () => {
  let component: MainListListComponent;
  let fixture: ComponentFixture<MainListListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainListListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainListListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
