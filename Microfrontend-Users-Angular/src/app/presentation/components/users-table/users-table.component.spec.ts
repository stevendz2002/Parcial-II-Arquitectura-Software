import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersTableComponent } from './users-table.component';
import { USERS_MOCK } from '../../../mocks/users.mocks';

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    component.users = USERS_MOCK;
    fixture.detectChanges();
  });

  it('should create and render users rows', () => {
    expect(component).toBeTruthy();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(USERS_MOCK.length);
  });
});
