export const mockAuth = (currentUser = null, unsubscribe = jest.fn()) => {
  const auth = {
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signInAnonymously: jest.fn(),
    signInWithCustomToken: jest.fn(),
    signInWithPopup: jest.fn(),
    signInWithGoogle: jest.fn(),
    signInWithFacebook: jest.fn(),
    signInWithTwitter: jest.fn(),
    signInWithGithub: jest.fn(),
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

export const mockAuthProvider = () => {
  const provider = {
    scopes: [],
    customParameters: {},
    addScope: jest.fn((scope) => {
      provider.scopes.push(scope);
    }),
    setCustomParameters: jest.fn((customParameters) => {
      provider.customParameters = customParameters;
    }),
  };
  return provider;
};
