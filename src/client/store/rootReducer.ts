import { combineReducers } from 'redux';
import { LocationState } from 'redux-first-router';
import { routerReducer as location } from 'client/router/router';
import { login, LoginState } from 'client/app/login/login.reducer';
import { dashboard, DashboardState } from 'client/app/dashboard/dashboard.reducer';
import { create, CreateState } from 'client/app/create/create.reducer';

export interface State {
  location: LocationState;
  login: LoginState;
  dashboard: DashboardState;
  create: CreateState;
}

const rootReducer = combineReducers({
  location,
  login,
  dashboard,
  create
});

export default rootReducer;
