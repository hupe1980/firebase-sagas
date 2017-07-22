export const mockAuth = () => {
  const auth = {
    signInWithEmailAndPassword() { },
    signOut() { },
  };
  return auth;
};

export const mockAuthContext = (auth) => {
  const context = {
    app: {
      auth() {
        return auth;
      },
    },
  };
  return context;
};
