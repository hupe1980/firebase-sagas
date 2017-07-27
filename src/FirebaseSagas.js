import firebase from 'firebase';
import authModule from './auth/authModule';
import dbModule from './db/dbModule';

export { default as Query } from './db/Query';

/**
 * @class FirebaseSagas
 * @classdesc
 * FirebaseSagas
 */
class FirebaseSagas {
  constructor(app) {
    this.app = app;

    /**
     * Database methods: firebase.database()
     */
    this.database = {
      fetch: dbModule.fetch.bind(this),
      push: dbModule.push.bind(this),
      update: dbModule.update.bind(this),
      set: dbModule.set.bind(this),
      remove: dbModule.remove.bind(this),
      sync: dbModule.sync.bind(this),
      createOnEventChannel: dbModule.createOnEventChannel.bind(this),
    };

    /**
     * Auth methods: firebase.auth()
     */
    this.auth = {
      createOnAuthStateChangedChannel: authModule.createOnAuthStateChangedChannel.bind(this),
      signInWithEmailAndPassword: authModule.signInWithEmailAndPassword.bind(this),
      signOut: authModule.signOut.bind(this),
      createUserWithEmailAndPassword: authModule.createUserWithEmailAndPassword.bind(this),
      currentUser: authModule.currentUser.bind(this),
    };
  }

  /**
   * Factory to generate FirebaseSagas by firebase-config
   */
  static createByConfig(config) {
    const app = firebase.initializeApp(config);
    return new FirebaseSagas(app);
  }
}

export default FirebaseSagas;
