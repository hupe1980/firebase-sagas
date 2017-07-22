export const mockRef = () => ({
  once: jest.fn(),
  on: jest.fn((event, callback) => { }),
  push: jest.fn(),
  remove: jest.fn(),
  set: jest.fn(),
  update: jest.fn(),
});

export const mockDatabaseContext = (ref) => {
  const context = {
    app: {
      database: jest.fn(() => {
        const database = {
          ref: jest.fn(() => ref),
        };
        return database;
      }),
    },
  };
  return context;
};

export const mockSnapshot = (object) => {
  const snapshot = {
    forEach: jest.fn((fn) => {
      Object.keys(object).forEach((key) => {
        fn({
          val: () => ({ [key]: object[key] }),
          key,
        });
      });
    }),
    val: jest.fn(() => object),
  };
  return snapshot;
};
