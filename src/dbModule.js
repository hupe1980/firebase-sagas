import { eventChannel } from 'redux-saga';
import { call, take, put } from 'redux-saga/effects';
import { addQueries, toArray } from './dbUtils';

const events = {
  VALUE: 'value', // default
  CHILD_ADDED: 'child_added',
  CHILD_REMOVED: 'child_removed',
  CHILD_CHANGED: 'child_changed',
  CHILD_MOVED: 'child_moved',
};

/**
 * Retrieve data from database just once without subscribing or listening for data changes.
 *
 * @param path
 * @param queries
 * @param asArray
 * @returns {*|any}
 */
function* fetch(path, queries = {}, asArray = false) {
  let ref = this.app.database().ref(path);
  ref = addQueries(ref, queries);
  const snapshot = yield call([ref, ref.once], 'value');

  if (asArray === true) {
    return toArray(snapshot);
  }
  return snapshot.val();
}

/**
 * Generates a new child location using a unique key and returns its Reference
 *
 * @param path
 * @param value
 * @returns {*|any}
 */
function* push(path, value) {
  const ref = this.app.database().ref(path);
  const result = yield call([ref, ref.push], value);

  return result;
}

/**
 * Writes multiple values to the Database at once.
 *
 * @param values
 */
function* update(values) {
  const ref = this.app.database().ref();
  yield call([ref, ref.update], values);
}

/**
 * Writes data to this Database location.
 *
 * @param path
 * @param value
 */
function* set(path, value) {
  const ref = this.app.database().ref(path);
  yield call([ref, ref.set], value);
}

/**
 * Removes the data at this Database location.
 *
 * @param path
 */
function* remove(path) {
  const ref = this.app.database().ref(path);
  yield call([ref, ref.remove]);
}

function* sync(path, actionCreator, event = events.VALUE) {
  const channel = yield call(this.database.createEventChannel, path, event);

  while (true) {
    switch (event) {
      case events.VALUE: { // Handle a new value
        const { dataSnapshot } = yield take(channel);
        yield put(actionCreator(dataSnapshot.val()));
        break;
      }
      case events.CHILD_ADDED: // Handle a new child
      case events.CHILD_CHANGED: // Handle child data changes
      case events.CHILD_MOVED: { // Handle child ordering changes
        const { childSnapshot, prevChildKey } = yield take(channel);
        yield put(actionCreator(childSnapshot, prevChildKey));
        break;
      }
      case events.CHILD_REMOVED: { // Handle child removal
        const { oldChildSnapshot } = yield take(channel);
        yield put(actionCreator(oldChildSnapshot));
        break;
      }
      default:
        throw new Error('sync: Unknown event');
    }
  }
}

/**
 * @param path
 * @param event
 */
function createEventChannel(path, event = events.VALUE) {
  const ref = this.app.database().ref(path);

  switch (event) {
    case events.VALUE: // Handle a new value
      return eventChannel((emit) => {
        const callback = ref.on(event, dataSnapshot => emit({ dataSnapshot }));
        return () => ref.off(event, callback); // The subscriber must return an unsubscribe function
      });

    case events.CHILD_ADDED: // Handle a new child
    case events.CHILD_CHANGED: // Handle child data changes
    case events.CHILD_MOVED: // Handle child ordering changes
      return eventChannel((emit) => {
        const callback = ref.on(event, (childSnapshot, prevChildKey) => emit({ childSnapshot, prevChildKey }));
        return () => ref.off(event, callback); // The subscriber must return an unsubscribe function
      });

    case events.CHILD_REMOVED: // Handle child removal
      return eventChannel((emit) => {
        const callback = ref.on(event, oldChildSnapshot => emit({ oldChildSnapshot }));
        return () => ref.off(event, callback); // The subscriber must return an unsubscribe function
      });

    default:
      throw new Error('createEventChannel: Unknown event');
  }
}

export default {
  fetch,
  push,
  update,
  set,
  remove,
  sync,
  createEventChannel,
};
