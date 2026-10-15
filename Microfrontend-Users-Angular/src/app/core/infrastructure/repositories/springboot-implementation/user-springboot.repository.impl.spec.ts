import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserSpringbootRepositoryImpl } from './user-springboot.repository.impl';
import { DataService } from '../../services/data.service';
import { USERS_MOCK } from '../../../../mocks/users.mocks';

describe('UserSpringbootRepositoryImpl', () => {
  let repository: UserSpringbootRepositoryImpl;
  let dataServiceMock: jest.Mocked<DataService>;

  beforeEach(() => {
    dataServiceMock = {
      getAll: jest.fn(),
    } as unknown as jest.Mocked<DataService>;

    TestBed.configureTestingModule({
      providers: [
        UserSpringbootRepositoryImpl,
        { provide: DataService, useValue: dataServiceMock },
      ],
    });

    repository = TestBed.inject(UserSpringbootRepositoryImpl);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should fetch all users from Spring Boot backend', (done) => {
    dataServiceMock.getAll.mockReturnValue(of(USERS_MOCK));

    repository.getAll().subscribe((data) => {
      expect(data).toEqual(USERS_MOCK);
      expect(dataServiceMock.getAll).toHaveBeenCalledWith('http://localhost:8081/api/users');
      done();
    });
  });

  it('should fetch active users from Spring Boot backend', (done) => {
    dataServiceMock.getAll.mockReturnValue(of(USERS_MOCK));

    repository.getActive().subscribe((data) => {
      expect(data).toEqual(USERS_MOCK);
      expect(dataServiceMock.getAll).toHaveBeenCalledWith('http://localhost:8081/api/users/active');
      done();
    });
  });

  it('should fetch admin users from Spring Boot backend', (done) => {
    dataServiceMock.getAll.mockReturnValue(of(USERS_MOCK));

    repository.getAdmins().subscribe((data) => {
      expect(data).toEqual(USERS_MOCK);
      expect(dataServiceMock.getAll).toHaveBeenCalledWith('http://localhost:8081/api/users/admins');
      done();
    });
  });
});
