import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetActiveUsersUseCase } from './get-active-users.usecase';
import { UserRepository } from '../../domain/repositories/user.repository';
import { USERS_MOCK } from '../../../mocks/users.mocks';

describe('GetActiveUsersUseCase', () => {
  let useCase: GetActiveUsersUseCase;
  let repositoryMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    repositoryMock = {
      getAll: jest.fn(),
      getActive: jest.fn(),
      getAdmins: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    TestBed.configureTestingModule({
      providers: [
        GetActiveUsersUseCase,
        { provide: UserRepository, useValue: repositoryMock },
      ],
    });

    useCase = TestBed.inject(GetActiveUsersUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should return active users from repository', (done) => {
    const activeUsers = USERS_MOCK.filter((u) => u.active);
    repositoryMock.getActive.mockReturnValue(of(activeUsers));

    useCase.execute().subscribe((users) => {
      expect(users).toEqual(activeUsers);
      expect(repositoryMock.getActive).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should propagate error when repository fails', (done) => {
    const error = new Error('Active users error');
    repositoryMock.getActive.mockReturnValue(throwError(() => error));

    useCase.execute().subscribe({
      error: (err) => {
        expect(err).toBe(error);
        done();
      },
    });
  });
});
