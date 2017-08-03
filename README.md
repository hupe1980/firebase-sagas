[![NPM version](https://img.shields.io/npm/v/firebase-sagas.svg?style=flat-square)](https://npmjs.org/package/firebase-sagas)
[![NPM downloads](https://img.shields.io/npm/dm/firebase-sagas.svg?style=flat-square)](https://npmjs.org/package/firebase-sagas)
# firebase-sagas
A [redux-saga](https://github.com/redux-saga/redux-saga/) integration for [firebase (auth, database)](https://firebase.google.com/):
- Authentication and realtime database support
- Listen for value and child events (`value`, `child_added`, `child_removed`, `child_changed`, `child_moved`)
- Snapshots as array support
- Sorting and filtering data ( `orderByChild`, `orderByKey`, `orderByValue`, `orderByPriority`, `limitToLast`, `limitToFirst`, `startAt`, `endAt`, `equalTo`)

Try out the example [app](https://fir-sagas.firebaseapp.com/)

## Install
```bash
npm install firebase-sagas --save
```
or
```bash
yarn add firebase-sagas
```

## Getting started
```js
import { createFirebaseSagas } from 'firebase-sagas';

const config = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID'
};

const firebaseSagas = createFirebaseSagas(config);

...

function* fetchDataSaga(action) {
  try {
    const { query } = action.payload;
    const data = yield call(firebaseSagas.database.once, '/data', 'value', { query, asArray: true });
    yield put(fetchDataSuccess(data));
  }
  catch(error) {
    yield put(fetchDataFailure(error));
  }
}

...
```

## API
## Modules

<dl>
<dt><a href="#module_Constants">Constants</a></dt>
<dd><p>Constants.</p>
</dd>
<dt><a href="#module_database">database</a></dt>
<dd><p>A module for firebaseSagas.database</p>
</dd>
<dt><a href="#module_auth">auth</a></dt>
<dd><p>A module for firebaseSagas.auth</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#FirebaseSagas">FirebaseSagas</a></dt>
<dd><p>FirebaseSagas</p>
</dd>
<dt><a href="#Query">Query</a></dt>
<dd><p>Query</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#createFirebaseSagas">createFirebaseSagas(config)</a> ⇒ <code><a href="#FirebaseSagas">FirebaseSagas</a></code></dt>
<dd><p>Creates a FirebaseSagas-Instance</p>
</dd>
<dt><a href="#createQuery">createQuery()</a> ⇒ <code><a href="#Query">Query</a></code></dt>
<dd><p>Creates a new Query</p>
</dd>
</dl>

<a name="module_Constants"></a>

## Constants
Constants.

<a name="module_database"></a>

## database
A module for firebaseSagas.database


* [database](#module_database)
    * [~once(path, eventType, options)](#module_database..once) ⇒ <code>\*</code> \| <code>any</code>
    * [~push(path, value)](#module_database..push) ⇒ <code>\*</code> \| <code>any</code>
    * [~update(path, values)](#module_database..update)
    * [~set(path, value)](#module_database..set)
    * [~remove(path)](#module_database..remove)
    * [~on(path, eventType, actionCreator, options)](#module_database..on)
    * [~createOnEventChannel(path, eventType)](#module_database..createOnEventChannel) ⇒ <code>eventChannel</code>

<a name="module_database..once"></a>

### database~once(path, eventType, options) ⇒ <code>\*</code> \| <code>any</code>
Retrieve data from database just once without subscribing or listening for data changes.

**Kind**: inner method of [<code>database</code>](#module_database)  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| eventType | <code>string</code> | 
| options | <code>object</code> | 

<a name="module_database..push"></a>

### database~push(path, value) ⇒ <code>\*</code> \| <code>any</code>
Generates a new child location using a unique key and returns its Reference

**Kind**: inner method of [<code>database</code>](#module_database)  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| value |  | 

<a name="module_database..update"></a>

### database~update(path, values)
Writes multiple values to the Database at once.

**Kind**: inner method of [<code>database</code>](#module_database)  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| values |  | 

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

<a name="module_database..on"></a>

### database~on(path, eventType, actionCreator, options)
**Kind**: inner method of [<code>database</code>](#module_database)  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| eventType | <code>string</code> | 
| actionCreator | <code>function</code> | 
| options | <code>object</code> | 

<a name="module_database..createOnEventChannel"></a>

### database~createOnEventChannel(path, eventType) ⇒ <code>eventChannel</code>
**Kind**: inner method of [<code>database</code>](#module_database)  
**Returns**: <code>eventChannel</code> - onEventChannel  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| eventType | <code>string</code> | 

<a name="module_auth"></a>

## auth
A module for firebaseSagas.auth


* [auth](#module_auth)
    * [~createUserWithEmailAndPassword(email, password)](#module_auth..createUserWithEmailAndPassword) ⇒ <code>firebase.User</code>
    * [~signInWithEmailAndPassword(email, password)](#module_auth..signInWithEmailAndPassword) ⇒ <code>firebase.User</code>
    * [~signOut()](#module_auth..signOut)
    * [~syncUser(actionCreator)](#module_auth..syncUser)
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
<a name="module_auth..syncUser"></a>

### auth~syncUser(actionCreator)
**Kind**: inner method of [<code>auth</code>](#module_auth)  

| Param | Type |
| --- | --- |
| actionCreator | <code>function</code> | 

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

* [FirebaseSagas](#FirebaseSagas)
    * [.database](#FirebaseSagas+database)
    * [.auth](#FirebaseSagas+auth)

<a name="FirebaseSagas+database"></a>

### firebaseSagas.database
See module database

**Kind**: instance property of [<code>FirebaseSagas</code>](#FirebaseSagas)  
**See**: database  
<a name="FirebaseSagas+auth"></a>

### firebaseSagas.auth
See module auth

**Kind**: instance property of [<code>FirebaseSagas</code>](#FirebaseSagas)  
**See**: auth  
<a name="Query"></a>

## Query
Query

**Kind**: global class  

* [Query](#Query)
    * [.equalTo(value, key)](#Query+equalTo)
    * [.startAt(value, key)](#Query+startAt)
    * [.endAt(value, key)](#Query+endAt)
    * [.limitToLast(limit)](#Query+limitToLast)
    * [.limitToFirst(limit)](#Query+limitToFirst)
    * [.orderByValue()](#Query+orderByValue)
    * [.orderByPriority()](#Query+orderByPriority)
    * [.orderByChild(path)](#Query+orderByChild)
    * [.orderByKey()](#Query+orderByKey)
    * [.reset()](#Query+reset)
    * [.toJSON()](#Query+toJSON)

<a name="Query+equalTo"></a>

### query.equalTo(value, key)
Creates a Query that includes children that match the specified value.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| value |  | The value to match for. The argument type depends on which orderBy*() function was used in this query. Specify a value that matches the orderBy*() type. When used in combination with orderByKey(), the value must be a string. |
| key | <code>optional</code> | The child key to start at, among the children with the previously specified priority. This argument is only allowed if ordering by child, value, or priority. |

<a name="Query+startAt"></a>

### query.startAt(value, key)
Creates a Query with the specified starting point.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| value |  | The value to start at. The argument type depends on which orderBy*() function was used in this query. Specify a value that matches the orderBy*() type. When used in combination with orderByKey(), the value must be a string. |
| key | <code>optional</code> | The child key to start at. This argument is only allowed if ordering by child, value, or priority. |

<a name="Query+endAt"></a>

### query.endAt(value, key)
Creates a Query with the specified ending point.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| value |  | The value to end at. The argument type depends on which orderBy*() function was used in this query. Specify a value that matches the orderBy*() type. When used in combination with orderByKey(), the value must be a string. |
| key | <code>optional</code> |  |

<a name="Query+limitToLast"></a>

### query.limitToLast(limit)
Generates a new Query object limited to the last specific number of children.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Description |
| --- | --- |
| limit | The maximum number of nodes to include in this query. |

<a name="Query+limitToFirst"></a>

### query.limitToFirst(limit)
Generates a new Query limited to the first specific number of children.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Description |
| --- | --- |
| limit | The maximum number of nodes to include in this query. |

<a name="Query+orderByValue"></a>

### query.orderByValue()
Generates a new Query object ordered by value.

**Kind**: instance method of [<code>Query</code>](#Query)  
<a name="Query+orderByPriority"></a>

### query.orderByPriority()
Generates a new Query object ordered by priority.

**Kind**: instance method of [<code>Query</code>](#Query)  
<a name="Query+orderByChild"></a>

### query.orderByChild(path)
Generates a new Query object ordered by the specified child key.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param |
| --- |
| path | 

<a name="Query+orderByKey"></a>

### query.orderByKey()
Generates a new Query object ordered by key.

**Kind**: instance method of [<code>Query</code>](#Query)  
<a name="Query+reset"></a>

### query.reset()
Resets the query

**Kind**: instance method of [<code>Query</code>](#Query)  
<a name="Query+toJSON"></a>

### query.toJSON()
Return the query as JSON-String

**Kind**: instance method of [<code>Query</code>](#Query)  
<a name="createFirebaseSagas"></a>

## createFirebaseSagas(config) ⇒ [<code>FirebaseSagas</code>](#FirebaseSagas)
Creates a FirebaseSagas-Instance

**Kind**: global function  
**Returns**: [<code>FirebaseSagas</code>](#FirebaseSagas) - firebaseSagas  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | FireBase config |

**Example**  
```js
import { createFirebaseSagas } from 'firebase-sagas':

const config = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID'
};

const firebaseSagas = createFirebaseSagas(config);
```
<a name="createQuery"></a>

## createQuery() ⇒ [<code>Query</code>](#Query)
Creates a new Query

**Kind**: global function  
**Returns**: [<code>Query</code>](#Query) - query  
**Example**  
```js
import { createQuery } from 'firebase-sagas';

const query = createQuery().startAt(10).endAt(15).orderByValue();
```

## License
[MIT](https://github.com/hupe1980/firebase-sagas/blob/master/LICENSE)
