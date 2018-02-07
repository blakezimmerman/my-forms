import { actionCreator } from './../shared/reduxUtils';
import { connectRoutes } from 'redux-first-router';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

const routesMap = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard'
};

const { reducer, middleware, enhancer } = connectRoutes(history, routesMap);

export { reducer as routerReducer };
export { middleware as routerMiddleware };
export { enhancer as routerEnhancer };

// Create actions for navigation
export const routeActions = {
  HOME: actionCreator<void>('HOME'),
  LOGIN: actionCreator<void>('LOGIN'),
  REGISTER: actionCreator<void>('REGISTER'),
  DASHBOARD: actionCreator<void>('DASHBOARD')
};
