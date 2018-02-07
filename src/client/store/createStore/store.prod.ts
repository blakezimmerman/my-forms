import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../rootReducer';
import epicMiddleware from '../rootEpic';
import { routerMiddleware, routerEnhancer } from 'client/router/router';

const store = createStore(
  rootReducer,
  compose(
    routerEnhancer,
    applyMiddleware(epicMiddleware, routerMiddleware)
  )
);

export default store;
