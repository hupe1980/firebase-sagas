import { call } from 'redux-saga/effects';
import authModule from './authModule';

describe('auth', () => {
  const unsubscribe = jest.fn();

  const subs = [];

  const auth = {
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn()
  };

  const context = {
    _firebase: {
      auth: jest.fn(() => auth)
    }
  };

  afterEach(() => {
    expect.hasAssertions();
  })

  describe('signInWithEmailAndPassword(email, password)', () => {
    it('returns a user', () => {
      const email = 'email';
      const password = 'password';
      const user = 'user';

      const iterator = authModule.signInWithEmailAndPassword.call(context, email, password);

      expect(iterator.next().value)
      .toEqual(call([auth, auth.signInWithEmailAndPassword], email, password));
      expect(iterator.next(user)).toEqual({ done: true, value: user });
    });
  });

  describe('signOut()', () => {
    it('works', () => {
      const iterator = authModule.signOut.call(context);

      expect(iterator.next().value).toEqual(call([auth, auth.signOut]));
      expect(iterator.next()).toEqual({ done: true, value: undefined });
    });
  });

})
