import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllUsersUseCase } from './get-all-users.usecase';
import { UserRepository } from '../../domain/repositories/user.repository';
import { USERS_MOCK } from '../../../mocks/users.mocks';

describe('GetAllUsersUseCase', () => {
  let useCase: GetAllUsersUseCase;
  let repositoryMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    repositoryMock = {
      getAll: jest.fn(),
      getActive: jest.fn(),
      getAdmins: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    TestBed.configureTestingModule({
      providers: [
        GetAllUsersUseCase,
        { provide: UserRepository, useValue: repositoryMock },
      ],
    });

    useCase = TestBed.inject(GetAllUsersUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should return all users from repository', (done) => {
    repositoryMock.getAll.mockReturnValue(of(USERS_MOCK));

    useCase.execute().subscribe((users) => {
      expect(users).toEqual(USERS_MOCK);
      expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should propagate error when repository fails', (done) => {
    const error = new Error('Spring Boot error');
    repositoryMock.getAll.mockReturnValue(throwError(() => error));

    useCase.execute().subscribe({
      error: (err) => {
        expect(err).toBe(error);
        done();
      },
    });
  });
});
