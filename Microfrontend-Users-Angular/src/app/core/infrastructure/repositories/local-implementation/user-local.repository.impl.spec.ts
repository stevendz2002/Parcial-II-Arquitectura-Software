import { TestBed } from '@angular/core/testing';
import { UserLocalRepositoryImpl } from './user-local.repository.impl';
import { USERS_MOCK } from '../../../../mocks/users.mocks';

describe('UserLocalRepositoryImpl', () => {
  let repository: UserLocalRepositoryImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLocalRepositoryImpl],
    });
    repository = TestBed.inject(UserLocalRepositoryImpl);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should return all mock users', (done) => {
    repository.getAll().subscribe((users) => {
      expect(users).toEqual(USERS_MOCK);
      done();
    });
  });

  it('should return only active mock users', (done) => {
    repository.getActive().subscribe((users) => {
      expect(users.every((u) => u.active)).toBe(true);
      done();
    });
  });

  it('should return only ADMIN mock users', (done) => {
    repository.getAdmins().subscribe((users) => {
      expect(users.every((u) => u.role === 'ADMIN')).toBe(true);
      done();
    });
  });
});
