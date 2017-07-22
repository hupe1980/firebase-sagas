/**
 * @class Query
 * Query
 */
class Query {

  /**
   * constructor
   */
  constructor() {
    this.query = {};
  }

  /**
   * Creates a Query that includes children that match the specified value.
   *
   * @param value The value to match for. The argument type depends on which orderBy*() function was used in this query. Specify a value that matches the orderBy*() type. When used in combination with orderByKey(), the value must be a string.
   * @param {optional} key  The child key to start at, among the children with the previously specified priority. This argument is only allowed if ordering by child, value, or priority.
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
   */
  endAt(value, key) {
    this.query = Object.assign(this.query, { endAt: { needParams: true, params: { value, key } } });
    return this;
  }

  /**
   * Generates a new Query object limited to the last specific number of children.
   *
   * @param limit The maximum number of nodes to include in this query.
   */
  limitToLast(limit) {
    this.query = Object.assign(this.query, { limitToLast: { needParams: true, params: { limit } } });
    return this;
  }

  /**
   * Generates a new Query limited to the first specific number of children.
   *
   * @param limit The maximum number of nodes to include in this query.
   */
  limitToFirst(limit) {
    this.query = Object.assign(this.query, { limitToFirst: { needParams: true, params: { limit } } });
    return this;
  }

  /**
   * Generates a new Query object ordered by value.
   */
  orderByValue() {
    this.query = Object.assign(this.query, { orderByValue: { needParams: false } });
    return this;
  }

  /**
   * Generates a new Query object ordered by priority.
   */
  orderByPriority() {
    this.query = Object.assign(this.query, { orderByPriority: { needParams: false } });
    return this;
  }

  /**
   * Generates a new Query object ordered by the specified child key.
   *
   * @param path
   */
  orderByChild(path) {
    this.query = Object.assign(this.query, { orderByChild: { needParams: true, params: { path } } });
    return this;
  }

  /**
   * Generates a new Query object ordered by key.
   */
  orderByKey() {
    this.query = Object.assign(this.query, { orderByKey: { needParams: false } });
    return this;
  }

  /**
   *
   */
  reset() {
    this.query = {};
  }

  /**
   *
   */
  extendRefWithQuery(ref) {
    let tmpRef = ref;
    Object.keys(this.query).forEach((key) => {
      if (this.query[key].needParams) {
        switch (key) {
          case 'equalTo':
          case 'startAt':
          case 'endAt': {
            const params = this.query[key].params;
            const para1 = params[Object.keys(params)[0]];
            const para2 = params[Object.keys(params)[1]];
            tmpRef = tmpRef[key](para1, para2);
            break;
          }

          case 'limitToLast':
          case 'limitToFirst':
          case 'orderByChild': {
            const params = this.query[key].params;
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
  }

  /**
   *
   */
  toJSON() {
    return this.query;
  }

}

export default Query;
