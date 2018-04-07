const store =
  process.env.NODE_ENV === 'production'
    ? require('./createStore/prod').default
    : require('./createStore/dev').default;

export { State } from './rootReducer';
export default store;
