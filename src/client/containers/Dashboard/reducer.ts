import { combineReducers } from 'redux';
import { actionCreator, asyncActionCreator, asyncReducer, AsyncReducerState } from 'client/helpers/redux';
import { Form } from 'models/forms';
import { DeleteWriteOpResultObject } from 'mongodb';

export const GET_FORMS_REQUEST = asyncActionCreator<void, Form[]>('GET_FORMS_REQUEST');
export const DELETE_FORM_REQUEST = asyncActionCreator<string, DeleteWriteOpResultObject>('DELETE_FORM_REQUEST');

export interface DashboardState {
  formsRequest: AsyncReducerState<Form[]>;
  deleteRequest: AsyncReducerState<DeleteWriteOpResultObject>;
}

export const dashboardReducer = combineReducers({
  formsRequest: asyncReducer(GET_FORMS_REQUEST),
  deleteRequest: asyncReducer(DELETE_FORM_REQUEST)
});
