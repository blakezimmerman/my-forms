import { combineReducers } from 'redux';
import {
  actionCreator, asyncActionCreator, asyncReducer,
  AsyncReducerState, Action, isType
} from 'client/shared/reduxUtils';
import { Form, Response } from 'models/forms';
import { match } from 'client/shared/miscUtils';
import * as R from 'ramda';

export const GET_FORM_REQUEST = asyncActionCreator<string, Form>('GET_FORM_REQUEST');
export const INIT_RESPONSES = actionCreator<number>('INIT_RESPONSES');
export const SET_RESPONSE = actionCreator<{i: number, response: Response}>('SET_RESPONSE');

export interface FormState {
  formRequest: AsyncReducerState<Form>;
  responses: Response[];
}

const responses = (state: Response[] = [], curAction: Action<any>) =>
  match<Action<any>, Response[]>(curAction)
    .on(isType(INIT_RESPONSES), (action) => new Array(action.payload).fill(undefined))
    .on(isType(SET_RESPONSE), (action) => R.update(action.payload.i, action.payload.response, state))
    .otherwise((action) => state);

export const form = combineReducers({
  formRequest: asyncReducer(GET_FORM_REQUEST),
  responses
});
