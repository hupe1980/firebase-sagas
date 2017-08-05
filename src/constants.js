/**
 * Constants.
 * @module constants
 */
export const ACTION_PREFIX = '@@firebase-sagas/';

export const eventTypes = {
  VALUE: 'value',
  CHILD_ADDED: 'child_added',
  CHILD_REMOVED: 'child_removed',
  CHILD_CHANGED: 'child_changed',
  CHILD_MOVED: 'child_moved',
};

export default {
  ACTION_PREFIX,
  eventTypes,
};
