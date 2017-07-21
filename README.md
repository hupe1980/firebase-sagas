# firebase-sagas
A [redux-saga](https://github.com/redux-saga/redux-saga/) integration for [firebase](https://firebase.google.com/).

## Getting started

### Install with

```
npm install firebase-saga --save

or

yarn add firebase-sagas
```

### Integrate Firebase with Sagas

```js

import firebase from 'firebase';
import FirebaseSagas from 'firebase-sagas';

const app = firebase.initializeApp({
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID'
});

const firebaseSagas = new FirebaseSagas(app);
function* fetchDataSaga(action) {
  try {
    const { queries, asArray } = action.payload;
    const data = yield call(firebaseSagas.database.fetch, '/data', queries, asArray);
    //const data = yield call(firebaseSagas.database.fetch, '/data');
    yield put(fetchDataSuccess(data));
  }
  catch(error) {
    yield put(fetchDataFailure(error));
  }
}

...

function* loginUserSaga(action) {  
  try {
    const { email, password } = action.payload;
    const user = yield call(firebaseSagas.auth.signInWithEmailAndPassword, email, password);
    yield put(loginUserSuccess(user));
    yield put(push('/')); //react-router-redux
  }
  catch(error) {
    yield put(loginUserFailure(error));
  }
}

...

function* logoutUserSaga() {
  try {
    yield call(firebaseSagas.auth.signOut);
    yield put(logoutUserSuccess(user));
  }
  catch(error) {
    yield put(logoutUserFailure(error));
  }
}

```

### API
- Browse the [docs](https://github.com/hupe1980/firebase-sagas/blob/master/docs.md)
