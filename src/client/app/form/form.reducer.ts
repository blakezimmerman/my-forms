import { combineReducers } from 'redux';
import { actionCreator, asyncActionCreator, asyncReducer, AsyncReducerState } from 'client/shared/reduxUtils';
import { Form } from 'models/forms';

export const GET_FORM_REQUEST = asyncActionCreator<string, Form>('GET_FORM_REQUEST');

export interface FormState {
  formRequest: AsyncReducerState<Form>;
}

export const form = combineReducers({
  formRequest: asyncReducer(GET_FORM_REQUEST)
});
