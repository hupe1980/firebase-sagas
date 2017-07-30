/**
 * A module for firebaseSagas.database
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
 * @private
 * @param ref
 * @param query
 * @return ref
 */
const extendRefWithQuery = (ref, query) => {
  let tmpRef = ref;
  Object.keys(query).forEach((key) => {
    if (query[key].needParams) {
      switch (key) {
        case 'equalTo':
        case 'startAt':
        case 'endAt': {
          const params = query[key].params;
          const para1 = params[Object.keys(params)[0]];
          const para2 = params[Object.keys(params)[1]];
          tmpRef = tmpRef[key](para1, para2);
          break;
        }

        case 'limitToLast':
        case 'limitToFirst':
        case 'orderByChild': {
          const params = query[key].params;
          const para1 = params[Object.keys(params)[0]];
          tmpRef = tmpRef[key](para1);
          break;
        }

        default:
          throw new Error('Unknown query!');
      }
    } else {
      tmpRef = tmpRef[key]();
    }
  });
  return tmpRef;
};

/**
 * Retrieve data from database just once without subscribing or listening for data changes.
 *
 * @param {string} path
 * @param {string} eventType
 * @param {object} options
 * @returns {*|any}
 */
function* once(path, eventType, options = null) {
  let ref = this.app.database().ref(path);

  if (options && options.query) {
    ref = extendRefWithQuery(ref, options.query);
  }

  const snapshot = yield call([ref, ref.once], eventType);

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
 * @param {string} path
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
 * @param {function} actionCreator
 * @param {object} options
 */
function* on(path, eventType, actionCreator, options = null) {
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
  // if (this.onEventChannel[path][eventType]) {
  //   return this.onEventChannel[path][eventType];
  // }
  let ref = this.app.database().ref(path);

  if (options && options.query) {
    ref = extendRefWithQuery(ref, options.query);
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
  once,
  push,
  update,
  set,
  remove,
  on,
  createOnEventChannel,
};
