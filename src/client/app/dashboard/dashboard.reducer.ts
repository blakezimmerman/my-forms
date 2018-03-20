import { combineReducers } from 'redux';
import { actionCreator, asyncActionCreator, asyncReducer, AsyncReducerState } from 'client/shared/reduxUtils';
import { Form } from 'models/forms';

export const GET_FORMS_REQUEST = asyncActionCreator<void, Form[]>('GET_FORMS_REQUEST');

export interface DashboardState {
  formsRequest: AsyncReducerState<Form[]>;
}

export const dashboard = combineReducers({
  formsRequest: asyncReducer(GET_FORMS_REQUEST)
});
