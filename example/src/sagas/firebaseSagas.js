import firebase from 'firebase';
import FirebaseSagas from 'firebase-sagas';

const app = firebase.initializeApp({
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
});

const firebaseSagas = new FirebaseSagas(app);

export default firebaseSagas;
