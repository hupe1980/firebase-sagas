const QUERIES_NEED_PARAMS = {
  orderByChild: true,
  orderByKey: false,
  orderByPriority: false,
  orderByValue: false,
  limitToFirst: true,
  limitToLast: true,
  startAt: true,
  endAt: true,
  equalTo: true,
};

export const addQueries = (ref, queries) => {
  let tmpRef = ref;
  Object.keys(queries).forEach((query) => {
    if (QUERIES_NEED_PARAMS[query]) {
      tmpRef = tmpRef[query](queries[query]);
    } else {
      tmpRef = tmpRef[query]();
    }
  });
  return tmpRef;
};

export const toArray = (snapshot) => {
  const array = [];
  snapshot.forEach((childSnapshot) => {
    const val = childSnapshot.val();
    val.key = childSnapshot.key;
    array.push(val);
  });
  return array;
};
