import { combineReducers } from 'redux';
import { actionCreator, asyncActionCreator, asyncReducer, AsyncReducerState } from 'client/helpers/redux';
import { WriteOpResult } from 'mongodb';
import { Form, NewForm } from 'models/forms';

export interface EditState {
  formRequest: AsyncReducerState<Form>;
  editRequest: AsyncReducerState<WriteOpResult>;
}

export const GET_EDIT_FORM_REQUEST = asyncActionCreator<void, Form>('GET_EDIT_FORM_REQUEST');
export const EDIT_REQUEST = asyncActionCreator<NewForm, WriteOpResult>('EDIT_REQUEST');

export const editReducer = combineReducers({
  formRequest: asyncReducer(GET_EDIT_FORM_REQUEST),
  editRequest: asyncReducer(EDIT_REQUEST)
});
