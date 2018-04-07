import { actionCreator } from '../helpers/redux';
import { connectRoutes } from 'redux-first-router';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

const routesMap = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CREATE_SURVEY: '/create-survey',
  CREATE_TEST: '/create-test',
  DISPLAY_FORM: '/forms/:id'
};

const { reducer, middleware, enhancer } = connectRoutes(history, routesMap);

export { reducer as locationReducer };
export { middleware as routerMiddleware };
export { enhancer as routerEnhancer };

// Create actions for navigation
export const routeActions = {
  HOME: actionCreator<void>('HOME'),
  LOGIN: actionCreator<void>('LOGIN'),
  REGISTER: actionCreator<void>('REGISTER'),
  DASHBOARD: actionCreator<void>('DASHBOARD'),
  CREATE_SURVEY: actionCreator<void>('CREATE_SURVEY'),
  CREATE_TEST: actionCreator<void>('CREATE_TEST'),
  DISPLAY_FORM: actionCreator<{id: string}>('DISPLAY_FORM')
};
