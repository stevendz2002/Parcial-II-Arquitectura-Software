import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UsersPage } from './users.page';
import { GetAllUsersUseCase } from '../../../core/application/usecases/get-all-users.usecase';
import { GetActiveUsersUseCase } from '../../../core/application/usecases/get-active-users.usecase';
import { GetAdminUsersUseCase } from '../../../core/application/usecases/get-admin-users.usecase';
import { USERS_MOCK } from '../../../mocks/users.mocks';

describe('UsersPage', () => {
  let component: UsersPage;
  let fixture: ComponentFixture<UsersPage>;
  let getAllMock: jest.Mocked<GetAllUsersUseCase>;
  let getActiveMock: jest.Mocked<GetActiveUsersUseCase>;
  let getAdminMock: jest.Mocked<GetAdminUsersUseCase>;

  beforeEach(async () => {
    getAllMock = { execute: jest.fn() } as unknown as jest.Mocked<GetAllUsersUseCase>;
    getActiveMock = { execute: jest.fn() } as unknown as jest.Mocked<GetActiveUsersUseCase>;
    getAdminMock = { execute: jest.fn() } as unknown as jest.Mocked<GetAdminUsersUseCase>;

    await TestBed.configureTestingModule({
      imports: [UsersPage],
      providers: [
        { provide: GetAllUsersUseCase, useValue: getAllMock },
        { provide: GetActiveUsersUseCase, useValue: getActiveMock },
        { provide: GetAdminUsersUseCase, useValue: getAdminMock },
      ],
    }).compileComponents();

    getAllMock.execute.mockReturnValue(of(USERS_MOCK));
    fixture = TestBed.createComponent(UsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load all users on init', () => {
    expect(component).toBeTruthy();
    expect(component.state.data).toEqual(USERS_MOCK);
    expect(component.state.loading).toBe(false);
  });

  it('should handle error when loadAllUsers fails', () => {
    getAllMock.execute.mockReturnValue(throwError(() => new Error('Error')));
    component.loadAllUsers();
    expect(component.state.error).toBe(true);
    expect(component.state.data).toEqual([]);
  });

  it('should load active users successfully', () => {
    getActiveMock.execute.mockReturnValue(of(USERS_MOCK));
    component.loadActiveUsers();
    expect(component.state.data).toEqual(USERS_MOCK);
    expect(component.state.error).toBe(false);
  });

  it('should handle error when loadActiveUsers fails', () => {
    getActiveMock.execute.mockReturnValue(throwError(() => new Error('Error')));
    component.loadActiveUsers();
    expect(component.state.error).toBe(true);
  });

  it('should load admin users successfully', () => {
    getAdminMock.execute.mockReturnValue(of(USERS_MOCK));
    component.loadAdminUsers();
    expect(component.state.data).toEqual(USERS_MOCK);
    expect(component.state.error).toBe(false);
  });

  it('should handle error when loadAdminUsers fails', () => {
    getAdminMock.execute.mockReturnValue(throwError(() => new Error('Error')));
    component.loadAdminUsers();
    expect(component.state.error).toBe(true);
  });
});
