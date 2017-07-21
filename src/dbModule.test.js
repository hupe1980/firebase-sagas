import { call, put, take } from 'redux-saga/effects';
import dbModule from './dbModule';

describe('database', () => {

  const context = {
    _firebase: {
      database: jest.fn(() => database)
    }
  };

  const database = {
    ref: jest.fn(() => ref)
  };

  const ref = {
    once: jest.fn(),
    push: jest.fn(),
    remove: jest.fn(),
    set: jest.fn(),
    update: jest.fn(),
  };

  afterEach(() => {
    expect.hasAssertions()
  })

  describe('fetch(path)', () => {
    it('works', () => {
      const path = '/path';
      const val = {
        key: 'data'
      };
      const snapshot = {
        val: jest.fn(() => val),
      };
      const gen = dbModule.fetch.call(context, path);
      expect(gen.next().value).toEqual(call([ref, ref.once], 'value'));
      expect(gen.next(snapshot)).toEqual({ done: true, value: val });
    });
  });

  describe('push(path, data)', () => {
    it('works', () => {
      const path = '/path';
      const data = 'testdata';
      const result = 'result';

      const gen = dbModule.push.call(context, path, data);

      expect(gen.next().value).toEqual(call([ref, ref.push], data));
      expect(gen.next(result)).toEqual({done: true, value: result});
    });
  });

  describe('update(values)', () => {
    it('works', () => {
      const values = {};
      values['/test1/key'] = 'test';
      values['/test2/key'] = 'test';

      const gen = dbModule.update.call(context, values);

      expect(gen.next().value).toEqual(call([ref, ref.update], values));
      expect(gen.next()).toEqual({done: true, value: undefined});
    });
  });

  describe('set(path, value)', () => {
    it('works', () => {
      const path = '/path';
      const value = { test1: 'aaa', test2: 'bbb' };

      const gen = dbModule.set.call(context, path, value);

      expect(gen.next().value).toEqual(call([ref, ref.set], value));
      expect(gen.next()).toEqual({done: true, value: undefined});
    });
  });

  describe('remove(path)', () => {
    it('works', () => {
      const path = '/path';

      const gen = dbModule.remove.call(context, path);

      expect(gen.next().value).toEqual(call([ref, ref.remove]));
      expect(gen.next()).toEqual({done: true, value: undefined});
    });
  });

});
