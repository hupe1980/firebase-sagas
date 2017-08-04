import { call } from 'redux-saga/effects';
import authModule from '../../src/sagas/authModule';
import { mockAuth, mockAuthContext } from './authMocks';
import { mockCallsCount } from '../testUtils';

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

  describe('signInAnonymously()', () => {
    it('returns a user', () => {
      const user = 'user';

      const gen = authModule.signInAnonymously.call(context);

      expect(gen.next().value).toEqual(call([auth, auth.signInAnonymously]));
      expect(gen.next(user)).toEqual({ done: true, value: user });
    });
  });

  describe('signInWithCustomToken(token)', () => {
    it('returns a user', () => {
      const token = 'token';
      const user = 'user';

      const gen = authModule.signInWithCustomToken.call(context, token);

      expect(gen.next().value).toEqual(call([auth, auth.signInWithCustomToken], token));
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

  describe('createOnAuthStateChangedChannel()', () => {
    it('works', () => {
      authModule.createOnAuthStateChangedChannel.call(context);

      expect(mockCallsCount(auth.onAuthStateChanged)).toBe(1);
    });

    it('channel.close()', () => {
      const unsubscribe = jest.fn();
      const localAuth = mockAuth(null, unsubscribe);
      const localContext = mockAuthContext(localAuth);

      const channel = authModule.createOnAuthStateChangedChannel.call(localContext);
      channel.close();

      expect(mockCallsCount(unsubscribe)).toBe(1);
    });
  });

  describe('currentUser()', () => {
    it('currentUser = null', () => {
      const currentUser = authModule.currentUser.call(context);

      expect(currentUser).toBe(null);
    });

    it('currentUser = user', () => {
      const currentUser = { uid: '0815' };
      const localAuth = mockAuth(currentUser);
      const localContext = mockAuthContext(localAuth);

      expect(authModule.currentUser.call(localContext)).toBe(currentUser);
    });
  });
});
