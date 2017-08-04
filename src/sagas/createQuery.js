/**
 * @class Query
 * @classdesc
 * Query
 */
export class Query {
  /**
   * constructor
   */
  constructor() {
    this.query = {};
  }

  /**
   * Creates a Query that includes children that match the specified value.
   * @param value The value to match for. The argument type depends on which orderBy*() function was used in this query. Specify a value that matches the orderBy*() type. When used in combination with orderByKey(), the value must be a string.
   * @param {optional} key  The child key to start at, among the children with the previously specified priority. This argument is only allowed if ordering by child, value, or priority.
   * @method Query#equalTo
   */
  equalTo(value, key) {
    this.query = Object.assign(this.query, { equalTo: { needParams: true, params: { value, key } } });
    return this;
  }

  /**
   * Creates a Query with the specified starting point.
   *
   * @param value The value to start at. The argument type depends on which orderBy*() function was used in this query. Specify a value that matches the orderBy*() type. When used in combination with orderByKey(), the value must be a string.
   * @param {optional} key The child key to start at. This argument is only allowed if ordering by child, value, or priority.
   * @method Query#startAt
   */
  startAt(value, key) {
    this.query = Object.assign(this.query, { startAt: { needParams: true, params: { value, key } } });
    return this;
  }

  /**
   * Creates a Query with the specified ending point.
   *
   * @param value The value to end at. The argument type depends on which orderBy*() function was used in this query. Specify a value that matches the orderBy*() type. When used in combination with orderByKey(), the value must be a string.
   * @param {optional} key
   * @method Query#endAt
   */
  endAt(value, key) {
    this.query = Object.assign(this.query, { endAt: { needParams: true, params: { value, key } } });
    return this;
  }

  /**
   * Generates a new Query object limited to the last specific number of children.
   *
   * @param limit The maximum number of nodes to include in this query.
   * @method Query#limitToLast
   */
  limitToLast(limit) {
    this.query = Object.assign(this.query, { limitToLast: { needParams: true, params: { limit } } });
    return this;
  }

  /**
   * Generates a new Query limited to the first specific number of children.
   *
   * @param limit The maximum number of nodes to include in this query.
   * @method Query#limitToFirst
   */
  limitToFirst(limit) {
    this.query = Object.assign(this.query, { limitToFirst: { needParams: true, params: { limit } } });
    return this;
  }

  /**
   * Generates a new Query object ordered by value.
   * @method Query#orderByValue
   */
  orderByValue() {
    this.query = Object.assign(this.query, { orderByValue: { needParams: false } });
    return this;
  }

  /**
   * Generates a new Query object ordered by priority.
   * @method Query#orderByPriority
   */
  orderByPriority() {
    this.query = Object.assign(this.query, { orderByPriority: { needParams: false } });
    return this;
  }

  /**
   * Generates a new Query object ordered by the specified child key.
   *
   * @param path
   * @method Query#orderByChild
   */
  orderByChild(path) {
    this.query = Object.assign(this.query, { orderByChild: { needParams: true, params: { path } } });
    return this;
  }

  /**
   * Generates a new Query object ordered by key.
   * @method Query#orderByKey
   */
  orderByKey() {
    this.query = Object.assign(this.query, { orderByKey: { needParams: false } });
    return this;
  }

  /**
   * Resets the query
   * @method Query#reset
   */
  reset() {
    this.query = {};
  }

  /**
   * Return the query as JSON-String
   * @method Query#toJSON
   */
  toJSON() {
    return this.query;
  }
}

/**
 * Creates a new Query
 * @function
 * @return {Query} query
 * @example
 * import { createQuery } from 'firebase-sagas';
 *
 * const query = createQuery().startAt(10).endAt(15).orderByValue();
 */
const createQuery = () => new Query();

export default createQuery;
