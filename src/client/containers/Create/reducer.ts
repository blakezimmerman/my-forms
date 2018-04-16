import { combineReducers } from 'redux';
import { asyncActionCreator, asyncReducer } from 'client/helpers/redux';
import { InsertOneWriteOpResult } from 'mongodb';
import { NewForm } from 'models/forms';

export const CREATE_REQUEST = asyncActionCreator<NewForm, InsertOneWriteOpResult>('CREATE_REQUEST');

export const createReducer = asyncReducer(CREATE_REQUEST);
