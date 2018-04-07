import { combineReducers } from 'redux';
import { locationReducer as location, LocationState } from 'client/router';
import { loginReducer as login, LoginState } from 'client/containers/Login';
import { dashboardReducer as dashboard, DashboardState } from 'client/containers/Dashboard';
import { createReducer as create, CreateState } from 'client/containers/Create';
import { formReducer as form, FormState } from 'client/containers/Form';

export interface State {
  location: LocationState;
  login: LoginState;
  dashboard: DashboardState;
  create: CreateState;
  form: FormState;
}

const rootReducer = combineReducers({
  location,
  login,
  dashboard,
  create,
  form
});

export default rootReducer;
