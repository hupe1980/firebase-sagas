import { createAction } from 'redux-actions';

export const types = {
  SAVE_TODO: {
    REQUEST: 'SAVE_TODO.REQUEST',
  },
  REMOVE_TODO: {
    REQUEST: 'REMOVE_TODO.REQUEST',
  },
  SYNC_TODOS: {
    TRIGGER: 'SYNC_TODOS.TRIGGER',
  },
  SET_TODO_STATUS: {
    REQUEST: 'SET_TODO_STATUS.REQUEST',
  },
};

export const saveTodoRequest = createAction(types.SAVE_TODO.REQUEST);
export const removeTodoRequest = createAction(types.REMOVE_TODO.REQUEST);
export const syncTodosTrigger = createAction(types.SYNC_TODOS.TRIGGER);
export const setTodoStatusRequest = createAction(types.SET_TODO_STATUS.REQUEST);
