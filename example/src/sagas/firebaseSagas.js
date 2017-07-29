import firebase from 'firebase';
import FirebaseSagas from 'firebase-sagas';
import config from '../configs/firebase.json';

const app = firebase.initializeApp(config);

const firebaseSagas = new FirebaseSagas(app);

export default firebaseSagas;
