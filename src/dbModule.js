import { eventChannel } from 'redux-saga';
import { call } from 'redux-saga/effects';

const QUERIES_NEED_PARAMS = {
  orderByChild: true,
  orderByKey: false,
  orderByPriority: false,
  orderByValue: false,
  limitToFirst: true,
  limitToLast: true,
  startAt: true,
  endAt: true,
  equalTo: true
};

/**
 * Retrieve data from database just once without subscribing or listening for data changes.
 *
 * @param path
 * @param queries
 * @param asArray
 * @returns {*|any}
 */
function* fetch(path, queries={}, asArray=false) {
  let ref = this._firebase.database().ref(path);
  ref = _addQueries(ref, queries);
  const snapshot = yield call([ref, ref.once], 'value');

  if (asArray === true)
    return _toArray(snapshot);
  else
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
  const ref = this._firebase.database().ref(path);
  const result = yield call([ref, ref.push], value);

  return result;
}

/**
 * Writes multiple values to the Database at once.
 *
 * @param path
 * @param value
 */
function* update(path, data) {
  const ref = this._firebase.database().ref(path);
  yield call([ref, ref.update], data); //TODO:
}

/**
 * Writes data to this Database location.
 *
 * @param path
 * @param value
 */
function* set(path, value) {
  const ref = this._firebase.database().ref(path);
  yield call([ref, ref.set], value);
}

/**
 * Removes the data at this Database location.
 *
 * @param path
 */
function* remove(path) {
  const ref = this._firebase.database().ref(path);
  yield call([ref, ref.remove]);
}

function _addQueries(ref, queries) {

  for (let query in queries) {
      if (QUERIES_NEED_PARAMS[query]) {
        ref = ref[query](queries[query]);
      } else {
        ref = ref[query]();
      }
  }
  return ref;
};

function _toArray(snapshot) {
  let array = [];
  snapshot.forEach(function(child) {
    const val = child.val();
    val.key = child.key;
    array.push(val);
  });
  return array;
};

export default {
  fetch,
  push,
  update,
  set,
  remove
};
