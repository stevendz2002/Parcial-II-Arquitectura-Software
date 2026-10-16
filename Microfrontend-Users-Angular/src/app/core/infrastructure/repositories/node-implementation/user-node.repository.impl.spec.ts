import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserNodeRepositoryImpl } from './user-node.repository.impl';
import { DataService } from '../../services/data.service';
import { USERS_MOCK } from '../../../../mocks/users.mocks';

describe('UserNodeRepositoryImpl', () => {
  let repository: UserNodeRepositoryImpl;
  let dataServiceMock: jest.Mocked<DataService>;

  beforeEach(() => {
    dataServiceMock = {
      getAll: jest.fn(),
    } as unknown as jest.Mocked<DataService>;

    TestBed.configureTestingModule({
      providers: [
        UserNodeRepositoryImpl,
        { provide: DataService, useValue: dataServiceMock },
      ],
    });

    repository = TestBed.inject(UserNodeRepositoryImpl);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should fetch all users from Node.js backend', (done) => {
    dataServiceMock.getAll.mockReturnValue(of(USERS_MOCK));

    repository.getAll().subscribe((data) => {
      expect(data).toEqual(USERS_MOCK);
      expect(dataServiceMock.getAll).toHaveBeenCalledWith('http://localhost:3001/api/users');
      done();
    });
  });

  it('should fetch active users from Node.js backend', (done) => {
    dataServiceMock.getAll.mockReturnValue(of(USERS_MOCK));

    repository.getActive().subscribe((data) => {
      expect(data).toEqual(USERS_MOCK);
      expect(dataServiceMock.getAll).toHaveBeenCalledWith('http://localhost:3001/api/users/active');
      done();
    });
  });

  it('should fetch admin users from Node.js backend', (done) => {
    dataServiceMock.getAll.mockReturnValue(of(USERS_MOCK));

    repository.getAdmins().subscribe((data) => {
      expect(data).toEqual(USERS_MOCK);
      expect(dataServiceMock.getAll).toHaveBeenCalledWith('http://localhost:3001/api/users/admins');
      done();
    });
  });
});
