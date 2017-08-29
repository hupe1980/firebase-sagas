export const getAuth = state => state.firebaseSagas.auth;

export const getConfig = state => state.firebaseSagas.config;

export default {
  getAuth,
  getConfig,
};
