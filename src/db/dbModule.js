/**
 * A module for database.
 * @module database
 */
import { eventChannel } from 'redux-saga';
import { call, take, put } from 'redux-saga/effects';
import Constants from '../Constants';

/**
 * @param snapshot
 * @return array
 */
const toArray = (snapshot) => {
  const array = [];
  snapshot.forEach((childSnapshot) => {
    const val = childSnapshot.val();
    val.key = childSnapshot.key;
    array.push(val);
  });
  return array;
};

/**
 * Retrieve data from database just once without subscribing or listening for data changes.
 *
 * @param {string} path
 * @param {Query} query
 * @param asArray
 * @returns {*|any}
 */
function* fetch(path, query = null, asArray = false) {
  let ref = this.app.database().ref(path);

  if (query) {
    ref = query.extendRefWithQuery(ref);
  }
  const snapshot = yield call([ref, ref.once], 'value');

  if (asArray === true) {
    return toArray(snapshot);
  }
  return snapshot.val();
}

/**
 * Generates a new child location using a unique key and returns its Reference
 *
 * @param {string} path
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
 * @param {string} path
 * @param value
 */
function* set(path, value) {
  const ref = this.app.database().ref(path);
  yield call([ref, ref.set], value);
}

/**
 * Removes the data at this Database location.
 *
 * @param {string} path
 */
function* remove(path) {
  const ref = this.app.database().ref(path);
  yield call([ref, ref.remove]);
}

/**
 * @param {string} path
 * @param actionCreator
 * @param {string} eventType
 */
function* sync(path, actionCreator, eventType = Constants.db.eventTypes.DEFAULT_EVENT_TYPE) {
  const channel = yield call(this.database.createEventChannel, path, eventType);

  while (true) {
    switch (eventType) {
      case Constants.db.eventTypes.VALUE: { // Handle a new value
        const { dataSnapshot } = yield take(channel);
        yield put(actionCreator(dataSnapshot.val()));
        break;
      }
      case Constants.db.eventTypes.CHILD_ADDED: // Handle a new child
      case Constants.db.eventTypes.CHILD_CHANGED: // Handle child data changes
      case Constants.db.eventTypes.CHILD_MOVED: { // Handle child ordering changes
        const { childSnapshot, prevChildKey } = yield take(channel);
        yield put(actionCreator(childSnapshot, prevChildKey));
        break;
      }
      case Constants.db.eventTypes.CHILD_REMOVED: { // Handle child removal
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
 * @param {string} path
 * @param {string} eventType
 */
function createEventChannel(path, eventType = Constants.db.DEFAULT_EVENT_TYPE) {
  const ref = this.app.database().ref(path);

  switch (eventType) {
    case Constants.db.eventTypes.VALUE: // Handle a new value
      return eventChannel((emit) => {
        const callback = ref.on(eventType, dataSnapshot => emit({ dataSnapshot }));
        return () => ref.off(eventType, callback); // The subscriber must return an unsubscribe function
      });

    case Constants.db.eventTypes.CHILD_ADDED: // Handle a new child
    case Constants.db.eventTypes.CHILD_CHANGED: // Handle child data changes
    case Constants.db.eventTypes.CHILD_MOVED: // Handle child ordering changes
      return eventChannel((emit) => {
        const callback = ref.on(eventType, (childSnapshot, prevChildKey) => emit({ childSnapshot, prevChildKey }));
        return () => ref.off(eventType, callback); // The subscriber must return an unsubscribe function
      });

    case Constants.db.eventTypes.CHILD_REMOVED: // Handle child removal
      return eventChannel((emit) => {
        const callback = ref.on(eventType, oldChildSnapshot => emit({ oldChildSnapshot }));
        return () => ref.off(eventType, callback); // The subscriber must return an unsubscribe function
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
