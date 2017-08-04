import createFirebaseSagas from 'firebase-sagas';
import config from '../configs/firebase.json';

const firebaseSagas = createFirebaseSagas(config);

export default firebaseSagas;
