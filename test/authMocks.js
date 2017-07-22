export const mockAuth = () => {
  const auth = {
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
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
