# firebase-sagas
A [redux-saga](https://github.com/redux-saga/redux-saga/) integration for [firebase (auth, database)](https://firebase.google.com/)

Try out the example [app](https://fir-sagas.firebaseapp.com/)

## Getting started

### Install with

```
npm install firebase-sagas --save

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

...

function* fetchDataSaga(action) {
  try {
    const { query } = action.payload;
    const data = yield call(firebaseSagas.database.fetch, '/data', { query, asArray: true });
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
  }
  catch(error) {
    yield put(loginUserFailure(error));
  }
}

...

function* logoutUserSaga() {
  try {
    yield call(firebaseSagas.auth.signOut);
    yield put(logoutUserSuccess());
    yield put(push('/')); //react-router-redux
  }
  catch(error) {
    yield put(logoutUserFailure(error));
  }
}

```

### API


* * *
