import { combineReducers } from 'redux';
import {
  actionCreator, asyncActionCreator, asyncReducer,
  AsyncReducerState, Action, isType
} from 'client/helpers/redux';
import { Form, Response } from 'models/forms';
import { InsertOneWriteOpResult } from 'mongodb';
import { match } from 'client/helpers/misc';
import * as R from 'ramda';

export const GET_FORM_REQUEST = asyncActionCreator<string, Form>('GET_FORM_REQUEST');
export const INIT_RESPONSES = actionCreator<number>('INIT_RESPONSES');
export const SET_RESPONSE = actionCreator<{i: number, response: Response}>('SET_RESPONSE');
export const SUBMIT_RESPONSES_REQUEST =
  asyncActionCreator<{id: string, responses: Response[]}, InsertOneWriteOpResult>('SUBMIT_RESPONSES_REQUEST');

export interface DisplayFormState {
  formRequest: AsyncReducerState<Form>;
  responses: Response[];
  submitRequest: AsyncReducerState<InsertOneWriteOpResult>;
}

const responses = (state: Response[] = [], curAction: Action<any>) =>
  match<Action<any>, Response[]>(curAction)
    .on(isType(INIT_RESPONSES), (action) => new Array(action.payload).fill(undefined))
    .on(isType(SET_RESPONSE), (action) => R.update(action.payload.i, action.payload.response, state))
    .otherwise((action) => state);

export const displayFormReducer = combineReducers({
  formRequest: asyncReducer(GET_FORM_REQUEST),
  responses,
  submitRequest: asyncReducer(SUBMIT_RESPONSES_REQUEST)
});
