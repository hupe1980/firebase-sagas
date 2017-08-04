import firebase from 'firebase';
import authModule from './authModule';
import dbModule from './dbModule';

/**
 * @class FirebaseSagas
 * @classdesc
 * FirebaseSagas
 */
export class FirebaseSagas {
  constructor(app) {
    this.app = app;

    /**
     * See module database
     * @member FirebaseSagas#database
     * @see database
     */
    this.database = {
      once: dbModule.once.bind(this),
      push: dbModule.push.bind(this),
      update: dbModule.update.bind(this),
      set: dbModule.set.bind(this),
      remove: dbModule.remove.bind(this),
      on: dbModule.on.bind(this),
      createOnEventChannel: dbModule.createOnEventChannel.bind(this),
    };

    /**
     * See module auth
     * @member FirebaseSagas#auth
     * @see auth
     */
    this.auth = {
      syncUser: authModule.syncUser.bind(this),
      createOnAuthStateChangedChannel: authModule.createOnAuthStateChangedChannel.bind(this),
      signInWithEmailAndPassword: authModule.signInWithEmailAndPassword.bind(this),
      signInAnonymously: authModule.signInAnonymously.bind(this),
      signInWithCustomToken: authModule.signInWithCustomToken.bind(this),
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

/**
 * Creates a FirebaseSagas-Instance
 * @function
 * @param {object} config FireBase config
 * @return {FirebaseSagas} firebaseSagas
 * @example
 * import createFirebaseSagas from 'firebase-sagas':
 *
 * const config = {
 *   apiKey: 'YOUR_API_KEY',
 *   authDomain: 'YOUR_AUTH_DOMAIN',
 *   databaseURL: 'YOUR_DATABASE_URL',
 *   projectId: 'YOUR_PROJECT_ID',
 *   storageBucket: 'YOUR_STORAGE_BUCKET',
 *   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID'
 * };
 *
 * const firebaseSagas = createFirebaseSagas(config);
 */
const createFirebaseSagas = config => FirebaseSagas.createByConfig(config);

export default createFirebaseSagas;
