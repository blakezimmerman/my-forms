const store =
  process.env.NODE_ENV === 'production'
    ? require('./store.prod').default
    : require('./store.dev').default;

export default store;
