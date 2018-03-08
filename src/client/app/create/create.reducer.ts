import { combineReducers } from 'redux';
import {
  actionCreator, asyncActionCreator, asyncReducer,
  AsyncReducerState, Action, isType
} from 'client/shared/reduxUtils';
import { match } from 'client/shared/miscUtils';
import { State } from 'client/store/rootReducer';
import { NewForm, FormType, Question, QuestionType } from 'models/forms';
import * as R from 'ramda';
import * as shortId from 'shortid';

export const SET_TYPE = actionCreator<string>('SET_TYPE');
export const UPDATE_NAME = actionCreator<string>('UPDATE_NAME');
export const ADD_QUESTION = actionCreator<QuestionType>('ADD_QUESTION');
export const REMOVE_QUESTION = actionCreator<number>('REMOVE_QUESTION');
export const UPDATE_PROMPT = actionCreator<{i: number, prompt: string}>('UPDATE_PROMPT');

export interface CreateState {
  form: NewForm;
}

const initialFormState = {
  published: false,
  type: FormType.Survey,
  name: '',
  questions: []
};

const updateQuestions = (state: NewForm, fn: (qs: Question[]) => Question[]) => R.evolve({questions: fn}, state);

const form = (state: NewForm = initialFormState, curAction: Action<any>) =>
  match<Action<any>, NewForm>(curAction)
    .on(isType(SET_TYPE), (action) => ({...initialFormState, type: action.payload}))
    .on(isType(UPDATE_NAME), (action) => ({...state, name: action.payload}))
    .on(isType(ADD_QUESTION), (action) => updateQuestions(state,
      R.append({_id: shortId.generate(), prompt: '', type: action.payload})
    ))
    .on(isType(REMOVE_QUESTION), (action) => updateQuestions(state,
      R.remove(action.payload, 1)
    ))
    .on(isType(UPDATE_PROMPT), (action) => updateQuestions(state,
      R.adjust(R.assoc('prompt', action.payload.prompt), action.payload.i)
    ))
    .otherwise((action) => state);

export const create = combineReducers({
  form
});