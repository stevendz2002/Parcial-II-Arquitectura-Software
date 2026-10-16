import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAdminUsersUseCase } from './get-admin-users.usecase';
import { UserRepository } from '../../domain/repositories/user.repository';
import { USERS_MOCK } from '../../../mocks/users.mocks';

describe('GetAdminUsersUseCase', () => {
  let useCase: GetAdminUsersUseCase;
  let repositoryMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    repositoryMock = {
      getAll: jest.fn(),
      getActive: jest.fn(),
      getAdmins: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    TestBed.configureTestingModule({
      providers: [
        GetAdminUsersUseCase,
        { provide: UserRepository, useValue: repositoryMock },
      ],
    });

    useCase = TestBed.inject(GetAdminUsersUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should return admin users from repository', (done) => {
    const adminUsers = USERS_MOCK.filter((u) => u.role === 'ADMIN');
    repositoryMock.getAdmins.mockReturnValue(of(adminUsers));

    useCase.execute().subscribe((users) => {
      expect(users).toEqual(adminUsers);
      expect(repositoryMock.getAdmins).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should propagate error when repository fails', (done) => {
    const error = new Error('Admin users error');
    repositoryMock.getAdmins.mockReturnValue(throwError(() => error));

    useCase.execute().subscribe({
      error: (err) => {
        expect(err).toBe(error);
        done();
      },
    });
  });
});
