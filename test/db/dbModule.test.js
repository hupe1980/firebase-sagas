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

  describe('fetch(path, query = null, asArray = false)', () => {
    it('defaults for query and asArray', () => {
      const path = '/path';
      const val = { key1: { data: 'data1' }, key2: { data: 'data2' } };
      const snapshot = mockSnapshot(val);

      const gen = dbModule.fetch.call(context, path);

      expect(gen.next().value).toEqual(call([ref, ref.once], 'value'));
      expect(gen.next(snapshot)).toEqual({ done: true, value: val });
    });

    it('asArray = true', () => {
      const path = '/path';
      const val = { key1: { data: 'data1' }, key2: { data: 'data2' } };
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

  describe('createOnEventChannel(path, eventType)', () => {
    it('default for eventType', () => {
      const path = '/path';
      const event = Constants.db.eventTypes.DEFAULT;
      dbModule.createOnEventChannel.call(context, path);

      expect(mockCallsCount(ref.on)).toBe(1); // The function was called exactly once
      expect(mockCall(ref.on)[0]).toBe(event);
    });

    it('child_added for eventType', () => {
      const path = '/path';
      const event = Constants.db.eventTypes.CHILD_ADDED;
      dbModule.createOnEventChannel.call(context, path, event);

      expect(mockCallsCount(ref.on)).toBe(1); // The function was called exactly once
      expect(mockCall(ref.on)[0]).toBe(event);
    });

    it('child_changed for eventType', () => {
      const path = '/path';
      const event = Constants.db.eventTypes.CHILD_CHANGED;
      dbModule.createOnEventChannel.call(context, path, event);

      expect(mockCallsCount(ref.on)).toBe(1); // The function was called exactly once
      expect(mockCall(ref.on)[0]).toBe(event);
    });

    it('child_moved for eventType', () => {
      const path = '/path';
      const event = Constants.db.eventTypes.CHILD_MOVED;
      dbModule.createOnEventChannel.call(context, path, event);

      expect(mockCallsCount(ref.on)).toBe(1); // The function was called exactly once
      expect(mockCall(ref.on)[0]).toBe(event);
    });

    it('child_removed for eventType', () => {
      const path = '/path';
      const event = Constants.db.eventTypes.CHILD_REMOVED;
      dbModule.createOnEventChannel.call(context, path, event);

      expect(mockCallsCount(ref.on)).toBe(1); // The function was called exactly once
      expect(mockCall(ref.on)[0]).toBe(event);
    });

    it('unknown eventType -> throws error', () => {
      const path = '/path';
      const event = 'UNKNOWN_EVENT';
      expect(() => { dbModule.createOnEventChannel.call(context, path, event); }).toThrow();
    });
  });

  describe('sync(path, actionCreator, eventType)', () => {
    it('works', () => {
      const path = '/path';
      const actionCreator = jest.fn();

      const gen = dbModule.sync.call(context, path, actionCreator, Constants.db.eventTypes.DEFAULT);

      expect(gen.next().value).toEqual(call(context.database.createOnEventChannel, path, Constants.db.eventTypes.DEFAULT));
    });
  });
});
