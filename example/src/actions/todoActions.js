import { createAction } from 'redux-actions';

export const types = {
  SAVE_TODO: 'SAVE_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
  SYNC_TODOS: 'SYNC_TODOS',
  SET_DONE_STATUS: 'SET_DONE_STATUS',
  START_SYNC_TODO: 'START_SYNC_TODO',
};


export const saveTodo = createAction(types.SAVE_TODO);
export const removeTodo = createAction(types.REMOVE_TODO);
export const syncTodos = createAction(types.SYNC_TODOS);
export const setDoneStatus = createAction(types.SET_DONE_STATUS);
export const startSyncTodo = createAction(types.START_SYNC_TODO);
