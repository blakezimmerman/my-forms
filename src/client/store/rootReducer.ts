import { combineReducers } from 'redux';
import { AsyncReducerState } from 'client/helpers/redux';
import { InsertOneWriteOpResult } from 'mongodb';
import { NewForm } from 'models/forms';
import { locationReducer as location, LocationState } from 'client/router';
import { loginReducer as login, LoginState } from 'client/containers/Login';
import { dashboardReducer as dashboard, DashboardState } from 'client/containers/Dashboard';
import { formEditorReducer as formEditor } from 'client/containers/FormEditor';
import { createReducer as create } from 'client/containers/Create';
import { displayFormReducer as displayForm, DisplayFormState } from 'client/containers/DisplayForm';

export interface State {
  location: LocationState;
  login: LoginState;
  dashboard: DashboardState;
  formEditor: NewForm;
  create: AsyncReducerState<InsertOneWriteOpResult>;
  displayForm: DisplayFormState;
}

const rootReducer = combineReducers({
  location,
  login,
  dashboard,
  formEditor,
  create,
  displayForm
});

export default rootReducer;
