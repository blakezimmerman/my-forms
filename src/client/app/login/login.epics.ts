import { combineEpics } from 'redux-observable';
import { State } from 'client/store/rootReducer';
import { Epic, getType } from 'client/shared/reduxUtils';
import { api, post, refreshSession } from 'client/shared/apiUtils';
import { match, is } from 'client/shared/miscUtils';
import { REFRESH_SESSION, LOGIN_REQUEST, REGISTER_REQUEST } from './login.reducer';
import { routeActions } from 'client/router/router';
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
      post(api('auth/login'), action.payload, LOGIN_REQUEST)
    )
  );

const registerRequestEpic: Epic = (actions$) =>
  actions$.ofType(getType(REGISTER_REQUEST.PENDING)).pipe(
    debounceTime(300),
    switchMap((action) =>
      post(api('users/new'), action.payload, REGISTER_REQUEST)
    )
  );

const registerSuccessEpic: Epic = (actions$) =>
  actions$.ofType(getType(REGISTER_REQUEST.SUCCESS)).pipe(
    mapTo(LOGIN_REQUEST.RESET())
  );

const loginSuccessEpic: Epic<State> = (actions$, store) =>
  actions$.ofType(getType(LOGIN_REQUEST.SUCCESS)).pipe(
    filter((action) => !(store.getState().location.pathname === '/')),
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
