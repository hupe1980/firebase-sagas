import firebase from 'firebase';
import authModule from './authModule';
import dbModule from './dbModule';

class FirebaseSagas {
  constructor(app) {
    this.app = app;

    // Database methods: firebase.database()
    this.database = {
      fetch: dbModule.fetch.bind(this),
      push: dbModule.push.bind(this),
      update: dbModule.update.bind(this),
      set: dbModule.set.bind(this),
      remove: dbModule.remove.bind(this),
      sync: dbModule.sync.bind(this),
      createEventChannel: dbModule.createEventChannel.bind(this),
    };

    // Auth methods: firebase.auth()
    this.auth = {
      createOnAuthStateChangedChannel: authModule.createOnAuthStateChangedChannel.bind(this),
      signInWithEmailAndPassword: authModule.signInWithEmailAndPassword.bind(this),
      signOut: authModule.signOut.bind(this),
      createUserWithEmailAndPassword: authModule.createUserWithEmailAndPassword.bind(this),
      currentUser: authModule.currentUser.bind(this),
    };
  }

  static createByConfig(config) {
    const app = firebase.initializeApp(config);
    return new FirebaseSagas(app);
  }
}

export default FirebaseSagas;
