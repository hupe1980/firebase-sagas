## Functions

<dl>
<dt><a href="#createUserWithEmailAndPassword">createUserWithEmailAndPassword(email, password)</a></dt>
<dd><p>Creates a new user account associated with the specified email address and password.</p>
</dd>
<dt><a href="#signInWithEmailAndPassword">signInWithEmailAndPassword(email, password)</a> ⇒</dt>
<dd><p>Signs in using an email and password.</p>
</dd>
<dt><a href="#signOut">signOut()</a></dt>
<dd><p>Signs out the current user.</p>
</dd>
<dt><a href="#createOnAuthStateChangedChannel">createOnAuthStateChangedChannel()</a></dt>
<dd><p>Creates channel that will subscribe to changes
to the user&#39;s sign-in state. Incoming events
from the event source will be queued in the channel
until interested takers are registered.</p>
</dd>
<dt><a href="#currentUser">currentUser()</a> ⇒</dt>
<dd><p>Returns the currently signed-in user (or null).</p>
</dd>
<dt><a href="#fetch">fetch(path, queries, asArray)</a> ⇒ <code>*</code> | <code>any</code></dt>
<dd><p>Retrieve data from database just once without subscribing or listening for data changes.</p>
</dd>
<dt><a href="#push">push(path, value)</a> ⇒ <code>*</code> | <code>any</code></dt>
<dd><p>Generates a new child location using a unique key and returns its Reference</p>
</dd>
<dt><a href="#update">update(path, value)</a></dt>
<dd><p>Writes multiple values to the Database at once.</p>
</dd>
<dt><a href="#set">set(path, value)</a></dt>
<dd><p>Writes data to this Database location.</p>
</dd>
<dt><a href="#remove">remove(path)</a></dt>
<dd><p>Removes the data at this Database location.</p>
</dd>
</dl>

<a name="createUserWithEmailAndPassword"></a>

## createUserWithEmailAndPassword(email, password)
Creates a new user account associated with the specified email address and password.

**Kind**: global function  

| Param |
| --- |
| email | 
| password | 

<a name="signInWithEmailAndPassword"></a>

## signInWithEmailAndPassword(email, password) ⇒
Signs in using an email and password.

**Kind**: global function  
**Returns**: user  

| Param |
| --- |
| email | 
| password | 

<a name="signOut"></a>

## signOut()
Signs out the current user.

**Kind**: global function  
<a name="createOnAuthStateChangedChannel"></a>

## createOnAuthStateChangedChannel()
Creates channel that will subscribe to changes
to the user's sign-in state. Incoming events
from the event source will be queued in the channel
until interested takers are registered.

**Kind**: global function  
<a name="currentUser"></a>

## currentUser() ⇒
Returns the currently signed-in user (or null).

**Kind**: global function  
**Returns**: user  
<a name="fetch"></a>

## fetch(path, queries, asArray) ⇒ <code>\*</code> \| <code>any</code>
Retrieve data from database just once without subscribing or listening for data changes.

**Kind**: global function  

| Param | Default |
| --- | --- |
| path |  | 
| queries |  | 
| asArray | <code>false</code> | 

<a name="push"></a>

## push(path, value) ⇒ <code>\*</code> \| <code>any</code>
Generates a new child location using a unique key and returns its Reference

**Kind**: global function  

| Param |
| --- |
| path | 
| value | 

<a name="update"></a>

## update(path, value)
Writes multiple values to the Database at once.

**Kind**: global function  

| Param |
| --- |
| path | 
| value | 

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

