import { combineEpics } from 'redux-observable';
import { State } from 'client/store';
import { Epic, getType } from 'client/helpers/redux';
import { api, httpPost, refreshSession } from 'client/helpers/api';
import { match, is } from 'client/helpers/misc';
import { REFRESH_SESSION, LOGIN_REQUEST, REGISTER_REQUEST } from './reducer';
import { routeActions } from 'client/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { filter } from 'rxjs/operators/filter';
import { mapTo } from 'rxjs/operators/mapTo';
import { switchMap } from 'rxjs/operators/switchMap';
import { debounceTime } from 'rxjs/operators/debounceTime';

const refreshSessionEpic: Epic = (actions$) =>
  actions$.ofType(getType(REFRESH_SESSION)).pipe(
    switchMap((action) =>
      refreshSession(LOGIN_REQUEST)
    )
  );

const loginRequestEpic: Epic = (actions$) =>
  actions$.ofType(getType(LOGIN_REQUEST.PENDING)).pipe(
    debounceTime(300),
    switchMap((action) =>
      httpPost(api('auth/login'), action.payload, LOGIN_REQUEST)
    )
  );

const registerRequestEpic: Epic = (actions$) =>
  actions$.ofType(getType(REGISTER_REQUEST.PENDING)).pipe(
    debounceTime(300),
    switchMap((action) =>
      httpPost(api('users'), action.payload, REGISTER_REQUEST)
    )
  );

const registerSuccessEpic: Epic = (actions$) =>
  actions$.ofType(getType(REGISTER_REQUEST.SUCCESS)).pipe(
    mapTo(LOGIN_REQUEST.RESET())
  );

const loginSuccessEpic: Epic<State> = (actions$, store) =>
  actions$.ofType(getType(LOGIN_REQUEST.SUCCESS)).pipe(
    filter((action) => is('/login', '/register')(store.getState().location.pathname)),
    switchMap((action) =>
      Observable.of(routeActions.DASHBOARD(), REGISTER_REQUEST.RESET())
    )
  );

export const loginEpic = combineEpics(
  refreshSessionEpic,
  loginRequestEpic,
  loginSuccessEpic,
  registerRequestEpic,
  registerSuccessEpic
);
