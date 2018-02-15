import { combineEpics } from 'redux-observable';
import { State } from 'client/store/rootReducer';
import { routeActions } from './router';
import { Epic, getType } from 'client/shared/reduxUtils';
import { delay } from 'rxjs/operators/delay';
import { filter } from 'rxjs/operators/filter';
import { mapTo } from 'rxjs/operators';
import { getAuthenticated } from 'client/app/login/login.selectors';

const authEpic: Epic<State> = (actions$, store) =>
  actions$.ofType('LOGIN', 'REGISTER').pipe(
    filter(() => getAuthenticated(store.getState())),
    mapTo(routeActions.DASHBOARD())
  );

const noAuthEpic: Epic<State> = (actions$, store) =>
  actions$.ofType('DASHBOARD').pipe(
    delay(300),
    filter(() => !getAuthenticated(store.getState())),
    mapTo(routeActions.LOGIN())
  );

export const routerEpic = combineEpics(
  authEpic,
  noAuthEpic
);
