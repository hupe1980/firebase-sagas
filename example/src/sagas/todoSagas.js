import { call, all, takeEvery, takeLatest } from 'redux-saga/effects';
import firebaseSagas from './firebaseSagas';
import { types, syncTodos } from '../actions/todoActions';

function* saveTodoSaga(action) {
  try {
    const { task } = action.payload;
    yield call(firebaseSagas.database.push, '/todos', { task, done: false });
  } catch (error) {
    console.log(error);
  }
}

function* removeTodoSaga(action) {
  try {
    const key = action.payload;
    yield call(firebaseSagas.database.remove, `/todos/${key}`);
  } catch (error) {
    console.log(error);
  }
}

function* setDoneStatusSaga(action) {
  try {
    const key = action.payload;
    yield call(firebaseSagas.database.update, `/todos/${key}`, { done: true });
  } catch (error) {
    console.log(error);
  }
}

function* startSyncTodoSaga() {
  yield firebaseSagas.database.on('/todos', 'value', syncTodos, { asArray: true });
}

export default function* todoRootSaga() {
  yield all([
    takeLatest(types.START_SYNC_TODO, startSyncTodoSaga),
    takeEvery(types.SAVE_TODO, saveTodoSaga),
    takeEvery(types.REMOVE_TODO, removeTodoSaga),
    takeEvery(types.SET_DONE_STATUS, setDoneStatusSaga),
  ]);
}
