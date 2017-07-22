import { call } from 'redux-saga/effects';
import authModule from '../../src/auth/authModule';
import { mockAuth, mockAuthContext } from './authMocks';

describe('auth', () => {
  const auth = mockAuth();
  const context = mockAuthContext(auth);

  afterEach(() => {
    expect.hasAssertions();
  });

  describe('createUserWithEmailAndPassword(email, password)', () => {
    it('works', () => {
      const email = 'email';
      const password = 'password';

      const gen = authModule.createUserWithEmailAndPassword.call(context, email, password);

      expect(gen.next().value).toEqual(call([auth, auth.createUserWithEmailAndPassword], email, password));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
  });

  describe('signInWithEmailAndPassword(email, password)', () => {
    it('returns a user', () => {
      const email = 'email';
      const password = 'password';
      const user = 'user';

      const gen = authModule.signInWithEmailAndPassword.call(context, email, password);

      expect(gen.next().value).toEqual(call([auth, auth.signInWithEmailAndPassword], email, password));
      expect(gen.next(user)).toEqual({ done: true, value: user });
    });
  });

  describe('signOut()', () => {
    it('works', () => {
      const gen = authModule.signOut.call(context);

      expect(gen.next().value).toEqual(call([auth, auth.signOut]));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
  });
});
