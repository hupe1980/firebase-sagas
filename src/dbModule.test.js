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
    off: jest.fn(),
    on: jest.fn((eventType, callback) => {
      subs.push({eventType, callback})
    }),
    once: jest.fn(),
    push: jest.fn(),
    remove: jest.fn(),
    set: jest.fn(),
    update: jest.fn()
  };

  afterEach(() => {
    expect.hasAssertions()
  })

  describe('fetch(path)', () => {
    it('works', () => {
      const path = 'testpath';
      const val = 'testdata';
      const snapshot = {
        val: jest.fn(() => val)
      };
      const iterator = dbModule.fetch.call(context, path);

      expect(iterator.next().value).toEqual(call([ref, ref.once], 'value'));
      expect(iterator.next(snapshot)).toEqual({ done: true, value: val });
      expect(snapshot.val.mock.calls.length).toBe(1);
      expect(snapshot.val.mock.calls[0]).toEqual([]);
    });
  });

  describe('push(path, data)', () => {
    it('works', () => {
      const path = 'testpath';
      const data = 'testdata';
      const result = {
        key: 'testkey'
      };
      const iterator = dbModule.push.call(context, path, data);

      expect(iterator.next().value).toEqual(call([ref, ref.push], data));
      expect(iterator.next(result)).toEqual({done: true, value: result});
    });
  });

});
