export const mockAuth = (currentUser = null, unsubscribe = jest.fn()) => {
  const auth = {
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    currentUser,
    onAuthStateChanged: jest.fn(nextOrObserver => unsubscribe),
  };
  return auth;
};

export const mockAuthContext = (auth) => {
  const context = {
    app: {
      auth: jest.fn(() => auth),
    },
  };
  return context;
};
