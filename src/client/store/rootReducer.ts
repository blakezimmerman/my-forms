import { combineReducers } from 'redux';
import { LocationState } from 'redux-first-router';
import { routerReducer as location } from 'client/router/router';
import { login, LoginState } from 'client/app/login/login.reducer';

export interface State {
  location: LocationState;
  login: LoginState;
}

const rootReducer = combineReducers({
  location,
  login
});

export default rootReducer;
