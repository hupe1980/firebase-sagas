import createQuery from '../../src/sagas/createQuery';

describe('Query', () => {
  const query = createQuery();
  it('startAt', () => {
    query.startAt(10).endAt(15).orderByValue();
    query.limitToFirst(100);
    console.log(query.toJSON());
  });
  it('startAt', () => {
    console.log(createQuery().limitToFirst(10).toJSON());
  });
});
