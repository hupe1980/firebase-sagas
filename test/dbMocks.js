export const mockRef = () => ({
  once() { },
  push() { },
  remove() { },
  set() { },
  update() { },
});

export const mockDatabaseContext = (ref) => {
  const context = {
    app: {
      database() {
        const database = {
          ref() {
            return ref;
          },
        };
        return database;
      },
    },
  };
  return context;
};

export const mockSnapshot = (object) => {
  const snapshot = {
    data: object,
    forEach(fn) {
      Object.keys(this.data).forEach((key) => {
        fn({
          val: () => ({ [key]: this.data[key] }),
          key,
        });
      });
    },
    val() {
      return this.data;
    },
  };
  return snapshot;
};
