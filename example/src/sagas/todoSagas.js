import { call, all, takeEvery } from 'redux-saga/effects';
import { Constants } from 'firebase-sagas';
import firebaseSagas from './firebaseSagas';
import { types, syncTodosTrigger } from '../actions/todoActions';

function* saveTodoSaga(action) {
  const { task } = action.payload;
  const todo = { task, done: false };
  yield call(firebaseSagas.database.push, '/todos', todo);
}

function* removeTodoSaga(action) {
  try {
    const key = action.payload;
    yield call(firebaseSagas.database.remove, `/todos/${key}`);
  } catch (error) {
    console.log(error);
  }
}

function* setTodoStatusSaga(action) {
  try {
    const key = action.payload;
    yield call(firebaseSagas.database.update, `/todos/${key}`, { done: true });
  } catch (error) {
    console.log(error);
  }
}

export default function* todoRootSaga() {
  yield all([
    firebaseSagas.database.sync('/todos', Constants.db.eventTypes.VALUE, syncTodosTrigger, { asArray: true }),
    takeEvery(types.SAVE_TODO.REQUEST, saveTodoSaga),
    takeEvery(types.REMOVE_TODO.REQUEST, removeTodoSaga),
    takeEvery(types.SET_TODO_STATUS.REQUEST, setTodoStatusSaga),
  ]);
}
