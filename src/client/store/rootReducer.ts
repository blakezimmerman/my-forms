import { combineReducers } from 'redux';
import { LocationState } from 'redux-first-router';
import { routerReducer as location } from 'client/router/router';

export interface State {
  location: LocationState;
}

const rootReducer = combineReducers({
  location
});

export default rootReducer;
