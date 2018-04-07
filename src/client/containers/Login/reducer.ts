import { combineReducers } from 'redux';
import { actionCreator, asyncActionCreator, asyncReducer, AsyncReducerState } from 'client/helpers/redux';
import { User } from 'models/users';
import { InsertOneWriteOpResult } from 'mongodb';

export const REFRESH_SESSION = actionCreator<void>('REFRESH_SESSION');
export const LOGIN_REQUEST = asyncActionCreator<User, string>('LOGIN_REQUEST');
export const REGISTER_REQUEST = asyncActionCreator<User, string>('REGISTER_REQUEST');

export interface LoginState {
  loginRequest: AsyncReducerState<string>;
  registerRequest: AsyncReducerState<InsertOneWriteOpResult>;
}

export const loginReducer = combineReducers({
  loginRequest: asyncReducer(LOGIN_REQUEST),
  registerRequest: asyncReducer(REGISTER_REQUEST)
});
