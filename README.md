# firebase-sagas
A [redux-saga](https://github.com/redux-saga/redux-saga/) integration for [firebase](https://firebase.google.com/).

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
    yield put(push('/')); //react-router-redux
  }
  catch(error) {
    yield put(logoutUserFailure(error));
  }
}

```

### API

## Functions

<dl>
<dt><a href="#createUserWithEmailAndPassword">createUserWithEmailAndPassword(email, password)</a> ⇒ <code>firebase.User</code></dt>
<dd><p>Creates a new user account associated with the specified email address and password.</p>
</dd>
<dt><a href="#signInWithEmailAndPassword">signInWithEmailAndPassword(email, password)</a> ⇒ <code>firebase.User</code></dt>
<dd><p>Signs in using an email and password.</p>
</dd>
<dt><a href="#signOut">signOut()</a></dt>
<dd><p>Signs out the current user.</p>
</dd>
<dt><a href="#createOnAuthStateChangedChannel">createOnAuthStateChangedChannel()</a> ⇒ <code>eventChannel</code></dt>
<dd><p>Creates channel that will subscribe to changes
to the user&#39;s sign-in state.</p>
</dd>
<dt><a href="#currentUser">currentUser()</a> ⇒ <code>firebase.User</code></dt>
<dd><p>Returns the currently signed-in user (or null).</p>
</dd>
<dt><a href="#fetch">fetch(path, queries, asArray)</a> ⇒ <code>*</code> | <code>any</code></dt>
<dd><p>Retrieve data from database just once without subscribing or listening for data changes.</p>
</dd>
<dt><a href="#push">push(path, value)</a> ⇒ <code>*</code> | <code>any</code></dt>
<dd><p>Generates a new child location using a unique key and returns its Reference</p>
</dd>
<dt><a href="#update">update(values)</a></dt>
<dd><p>Writes multiple values to the Database at once.</p>
</dd>
<dt><a href="#set">set(path, value)</a></dt>
<dd><p>Writes data to this Database location.</p>
</dd>
<dt><a href="#remove">remove(path)</a></dt>
<dd><p>Removes the data at this Database location.</p>
</dd>
<dt><a href="#createEventChannel">createEventChannel(path, event)</a></dt>
<dd></dd>
</dl>

<a name="createUserWithEmailAndPassword"></a>

## createUserWithEmailAndPassword(email, password) ⇒ <code>firebase.User</code>
Creates a new user account associated with the specified email address and password.

**Kind**: global function  
**Returns**: <code>firebase.User</code> - user  

| Param | Type |
| --- | --- |
| email | <code>string</code> | 
| password | <code>string</code> | 

<a name="signInWithEmailAndPassword"></a>

## signInWithEmailAndPassword(email, password) ⇒ <code>firebase.User</code>
Signs in using an email and password.

**Kind**: global function  
**Returns**: <code>firebase.User</code> - user  

| Param | Type |
| --- | --- |
| email | <code>string</code> | 
| password | <code>string</code> | 

<a name="signOut"></a>

## signOut()
Signs out the current user.

**Kind**: global function  
<a name="createOnAuthStateChangedChannel"></a>

## createOnAuthStateChangedChannel() ⇒ <code>eventChannel</code>
Creates channel that will subscribe to changes
to the user's sign-in state.

**Kind**: global function  
**Returns**: <code>eventChannel</code> - onAuthStateChangedChannel  
<a name="currentUser"></a>

## currentUser() ⇒ <code>firebase.User</code>
Returns the currently signed-in user (or null).

**Kind**: global function  
**Returns**: <code>firebase.User</code> - user  
<a name="fetch"></a>

## fetch(path, queries, asArray) ⇒ <code>\*</code> \| <code>any</code>
Retrieve data from database just once without subscribing or listening for data changes.

**Kind**: global function  

| Param |
| --- |
| path | 
| queries | 
| asArray | 

<a name="push"></a>

## push(path, value) ⇒ <code>\*</code> \| <code>any</code>
Generates a new child location using a unique key and returns its Reference

**Kind**: global function  

| Param |
| --- |
| path | 
| value | 

<a name="update"></a>

## update(values)
Writes multiple values to the Database at once.

**Kind**: global function  

| Param |
| --- |
| values | 

<a name="set"></a>

## set(path, value)
Writes data to this Database location.

**Kind**: global function  

| Param |
| --- |
| path | 
| value | 

<a name="remove"></a>

## remove(path)
Removes the data at this Database location.

**Kind**: global function  

| Param |
| --- |
| path | 

<a name="createEventChannel"></a>

## createEventChannel(path, event)
**Kind**: global function  

| Param |
| --- |
| path | 
| event | 


* * *
