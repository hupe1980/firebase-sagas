/**
 * A module for database.
 * @module database
 */
import { eventChannel } from 'redux-saga';
import { call, take, put } from 'redux-saga/effects';
import Constants from '../Constants';

/**
 * @private
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
 * @param {object} options
 * @returns {*|any}
 */
function* fetch(path, options = null) {
  let ref = this.app.database().ref(path);

  if (options && options.query) {
    ref = options.query.extendRefWithQuery(ref);
  }

  const snapshot = yield call([ref, ref.once], 'value');

  if (options && options.asArray === true) {
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
 * @param path
 * @param values
 */
function* update(path, values) {
  const ref = this.app.database().ref(path);
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
 * @param {string} eventType
 * @param actionCreator
 * @param options
 */
function* sync(path, eventType, actionCreator, options = null) {
  const channel = yield call(this.database.createOnEventChannel, path, eventType, options);

  while (true) {
    switch (eventType) {
      case Constants.db.eventTypes.VALUE: { // Handle a new value
        const { dataSnapshot } = yield take(channel);
        if (options && options.asArray === true) {
          yield put(actionCreator(toArray(dataSnapshot)));
        } else {
          yield put(actionCreator(dataSnapshot.val()));
        }
        break;
      }
      case Constants.db.eventTypes.CHILD_ADDED: // Handle a new child
      case Constants.db.eventTypes.CHILD_CHANGED: // Handle child data changes
      case Constants.db.eventTypes.CHILD_MOVED: { // Handle child ordering changes
        const { childSnapshot, prevChildKey } = yield take(channel);
        if (options && options.asArray === true) {
          yield put(actionCreator(toArray(childSnapshot), prevChildKey));
        } else {
          yield put(actionCreator(childSnapshot.val(), prevChildKey));
        }
        break;
      }
      case Constants.db.eventTypes.CHILD_REMOVED: { // Handle child removal
        const { oldChildSnapshot } = yield take(channel);
        if (options && options.asArray === true) {
          yield put(actionCreator(toArray(oldChildSnapshot)));
        } else {
          yield put(actionCreator(oldChildSnapshot.val()));
        }
        break;
      }
      default:
        throw new Error('sync: Unknown eventType');
    }
  }
}

/**
 * @param {string} path
 * @param {string} eventType
 * @returns {eventChannel} onEventChannel
 */
function createOnEventChannel(path, eventType, options = null) {
  let ref = this.app.database().ref(path);

  if (options && options.query) {
    ref = options.query.extendRefWithQuery(ref);
  }

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
      throw new Error('createOnEventChannel: Unknown eventType');
  }
}

export default {
  fetch,
  push,
  update,
  set,
  remove,
  sync,
  createOnEventChannel,
};
