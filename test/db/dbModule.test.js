import { call } from 'redux-saga/effects';
import dbModule from '../../src/db/dbModule';
import Constants from '../../src/Constants';
import { mockSnapshot, mockRef, mockDatabaseContext } from './dbMocks';
import { mockCall, mockCallsCount } from '../testUtils';

describe('database', () => {
  let ref;
  let context;

  beforeEach(() => {
    ref = mockRef();
    context = mockDatabaseContext(ref);
  });

  afterEach(() => {
    expect.hasAssertions();
  });

  describe('fetch(path, queries = {}, asArray = false)', () => {
    it('defaults for queries and asArray', () => {
      const path = '/path';
      const val = {
        key1: {
          data: 'data1',
        },
        key2: {
          data: 'data2',
        },
      };
      const snapshot = mockSnapshot(val);
      const gen = dbModule.fetch.call(context, path);
      expect(gen.next().value).toEqual(call([ref, ref.once], 'value'));
      expect(gen.next(snapshot)).toEqual({ done: true, value: val });
    });

    it('asArray = true', () => {
      const path = '/path';
      const val = {
        key1: {
          data: 'data1',
        },
        key2: {
          data: 'data2',
        },
      };
      const expected = [
        { key: 'key1', key1: { data: 'data1' } },
        { key: 'key2', key2: { data: 'data2' } },
      ];
      const snapshot = mockSnapshot(val);
      const gen = dbModule.fetch.call(context, path, null, true);
      expect(gen.next().value).toEqual(call([ref, ref.once], 'value'));
      expect(gen.next(snapshot)).toEqual({ done: true, value: expected });
    });
  });

  describe('push(path, data)', () => {
    it('works', () => {
      const path = '/path';
      const data = 'testdata';
      const result = 'result';

      const gen = dbModule.push.call(context, path, data);

      expect(gen.next().value).toEqual(call([ref, ref.push], data));
      expect(gen.next(result)).toEqual({ done: true, value: result });
    });
  });

  describe('update(values)', () => {
    it('works', () => {
      const values = {};
      values['/test1/key'] = 'test';
      values['/test2/key'] = 'test';

      const gen = dbModule.update.call(context, values);

      expect(gen.next().value).toEqual(call([ref, ref.update], values));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
  });

  describe('set(path, value)', () => {
    it('works', () => {
      const path = '/path';
      const value = { test1: 'aaa', test2: 'bbb' };

      const gen = dbModule.set.call(context, path, value);

      expect(gen.next().value).toEqual(call([ref, ref.set], value));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
  });

  describe('remove(path)', () => {
    it('works', () => {
      const path = '/path';

      const gen = dbModule.remove.call(context, path);

      expect(gen.next().value).toEqual(call([ref, ref.remove]));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
  });

  describe('createEventChannel(path, event)', () => {
    it('default for event', () => {
      const path = '/path';
      const event = Constants.db.DEFAULT_EVENT_TYPE;
      dbModule.createEventChannel.call(context, path);

      expect(mockCallsCount(ref.on)).toBe(1); // The function was called exactly once
      expect(mockCall(ref.on)[0]).toBe(event);
    });

    it('child_added for event', () => {
      const path = '/path';
      const event = Constants.db.eventTypes.CHILD_ADDED;
      dbModule.createEventChannel.call(context, path, event);

      expect(mockCallsCount(ref.on)).toBe(1); // The function was called exactly once
      expect(mockCall(ref.on)[0]).toBe(event);
    });

    it('unknown event -> throws error', () => {
      const path = '/path';
      const event = 'UNKNOWN_EVENT';
      expect(() => { dbModule.createEventChannel.call(context, path, event); }).toThrow();
    });
  });
});
