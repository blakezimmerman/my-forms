import { combineReducers } from 'redux';
import { actionCreator, asyncActionCreator, asyncReducer, AsyncReducerState } from 'client/shared/reduxUtils';
import { NewUser } from 'models/users';
import { InsertOneWriteOpResult } from 'mongodb';

export const REFRESH_SESSION = actionCreator<void>('REFRESH_SESSION');
export const LOGIN_REQUEST = asyncActionCreator<NewUser, string>('LOGIN_REQUEST');
export const REGISTER_REQUEST = asyncActionCreator<NewUser, string>('REGISTER_REQUEST');

export interface LoginState {
  loginRequest: AsyncReducerState<string>;
  registerRequest: AsyncReducerState<InsertOneWriteOpResult>;
}

export const login = combineReducers({
  loginRequest: asyncReducer(LOGIN_REQUEST),
  registerRequest: asyncReducer(REGISTER_REQUEST)
});
