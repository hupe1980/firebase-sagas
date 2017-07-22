# firebase-sagas
A [redux-saga](https://github.com/redux-saga/redux-saga/) integration for [firebase (auth, database)](https://firebase.google.com/)


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
    yield put(logoutUserSuccess());
    yield put(push('/')); //react-router-redux
  }
  catch(error) {
    yield put(logoutUserFailure(error));
  }
}

```

### API

## Modules

<dl>
<dt><a href="#module_Constants">Constants</a></dt>
<dd><p>Constants.</p>
</dd>
<dt><a href="#module_database">database</a></dt>
<dd><p>A module for database.</p>
</dd>
<dt><a href="#module_auth">auth</a></dt>
<dd><p>A module for auth.</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#FirebaseSagas">FirebaseSagas</a></dt>
<dd><p>FirebaseSagas</p>
</dd>
<dt><a href="#Query">Query</a></dt>
<dd><p>Query
Query</p>
</dd>
</dl>

<a name="module_Constants"></a>

## Constants
Constants.

<a name="module_database"></a>

## database
A module for database.


* [database](#module_database)
    * [~toArray(snapshot)](#module_database..toArray) ⇒
    * [~fetch(path, query, asArray)](#module_database..fetch) ⇒ <code>\*</code> \| <code>any</code>
    * [~push(path, value)](#module_database..push) ⇒ <code>\*</code> \| <code>any</code>
    * [~update(values)](#module_database..update)
    * [~set(path, value)](#module_database..set)
    * [~remove(path)](#module_database..remove)
    * [~sync(path, actionCreator, eventType)](#module_database..sync)
    * [~createEventChannel(path, eventType)](#module_database..createEventChannel)

<a name="module_database..toArray"></a>

### database~toArray(snapshot) ⇒
**Kind**: inner method of [<code>database</code>](#module_database)  
**Returns**: array  

| Param |
| --- |
| snapshot | 

<a name="module_database..fetch"></a>

### database~fetch(path, query, asArray) ⇒ <code>\*</code> \| <code>any</code>
Retrieve data from database just once without subscribing or listening for data changes.

**Kind**: inner method of [<code>database</code>](#module_database)  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| query | [<code>Query</code>](#Query) | 
| asArray |  | 

<a name="module_database..push"></a>

### database~push(path, value) ⇒ <code>\*</code> \| <code>any</code>
Generates a new child location using a unique key and returns its Reference

**Kind**: inner method of [<code>database</code>](#module_database)  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| value |  | 

<a name="module_database..update"></a>

### database~update(values)
Writes multiple values to the Database at once.

**Kind**: inner method of [<code>database</code>](#module_database)  

| Param |
| --- |
| values | 

<a name="module_database..set"></a>

### database~set(path, value)
Writes data to this Database location.

**Kind**: inner method of [<code>database</code>](#module_database)  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| value |  | 

<a name="module_database..remove"></a>

### database~remove(path)
Removes the data at this Database location.

**Kind**: inner method of [<code>database</code>](#module_database)  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 

<a name="module_database..sync"></a>

### database~sync(path, actionCreator, eventType)
**Kind**: inner method of [<code>database</code>](#module_database)  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| actionCreator |  | 
| eventType | <code>string</code> | 

<a name="module_database..createEventChannel"></a>

### database~createEventChannel(path, eventType)
**Kind**: inner method of [<code>database</code>](#module_database)  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| eventType | <code>string</code> | 

<a name="module_auth"></a>

## auth
A module for auth.


* [auth](#module_auth)
    * [~createUserWithEmailAndPassword(email, password)](#module_auth..createUserWithEmailAndPassword) ⇒ <code>firebase.User</code>
    * [~signInWithEmailAndPassword(email, password)](#module_auth..signInWithEmailAndPassword) ⇒ <code>firebase.User</code>
    * [~signOut()](#module_auth..signOut)
    * [~createOnAuthStateChangedChannel()](#module_auth..createOnAuthStateChangedChannel) ⇒ <code>eventChannel</code>
    * [~currentUser()](#module_auth..currentUser) ⇒ <code>firebase.User</code>

<a name="module_auth..createUserWithEmailAndPassword"></a>

### auth~createUserWithEmailAndPassword(email, password) ⇒ <code>firebase.User</code>
Creates a new user account associated with the specified email address and password.

**Kind**: inner method of [<code>auth</code>](#module_auth)  
**Returns**: <code>firebase.User</code> - user  

| Param | Type |
| --- | --- |
| email | <code>string</code> | 
| password | <code>string</code> | 

<a name="module_auth..signInWithEmailAndPassword"></a>

### auth~signInWithEmailAndPassword(email, password) ⇒ <code>firebase.User</code>
Signs in using an email and password.

**Kind**: inner method of [<code>auth</code>](#module_auth)  
**Returns**: <code>firebase.User</code> - user  

| Param | Type |
| --- | --- |
| email | <code>string</code> | 
| password | <code>string</code> | 

<a name="module_auth..signOut"></a>

### auth~signOut()
Signs out the current user.

**Kind**: inner method of [<code>auth</code>](#module_auth)  
<a name="module_auth..createOnAuthStateChangedChannel"></a>

### auth~createOnAuthStateChangedChannel() ⇒ <code>eventChannel</code>
Creates channel that will subscribe to changes
to the user's sign-in state.

**Kind**: inner method of [<code>auth</code>](#module_auth)  
**Returns**: <code>eventChannel</code> - onAuthStateChangedChannel  
<a name="module_auth..currentUser"></a>

### auth~currentUser() ⇒ <code>firebase.User</code>
Returns the currently signed-in user (or null).

**Kind**: inner method of [<code>auth</code>](#module_auth)  
**Returns**: <code>firebase.User</code> - user  
<a name="FirebaseSagas"></a>

## FirebaseSagas
FirebaseSagas

**Kind**: global class  
<a name="Query"></a>

## Query
Query
Query

**Kind**: global class  

* * *
