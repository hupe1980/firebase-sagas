import { call } from 'redux-saga/effects';
import authModule from '../src/authModule';
import { mockAuth, mockAuthContext } from './authMocks';

describe('auth', () => {
  const auth = mockAuth();
  const context = mockAuthContext(auth);

  afterEach(() => {
    expect.hasAssertions();
  });

  describe('signInWithEmailAndPassword(email, password)', () => {
    it('returns a user', () => {
      const email = 'email';
      const password = 'password';
      const user = 'user';

      const gen = authModule.signInWithEmailAndPassword.call(context, email, password);

      expect(gen.next().value)
        .toEqual(call([auth, auth.signInWithEmailAndPassword], email, password));
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
