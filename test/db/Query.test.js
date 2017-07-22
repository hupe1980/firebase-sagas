import Query from '../../src/db/Query';

describe('Query', () => {
  const query = new Query();
  it('startAt', () => {
    query.startAt(10).endAt(15).orderByValue();
    query.limitToFirst(100);
    console.log(query.toJSON());
  });
});
