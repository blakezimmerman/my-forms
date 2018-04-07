import { combineEpics } from 'redux-observable';
import { Epic, getType } from 'client/helpers/redux';
import { api, httpPost } from 'client/helpers/api';
import { CREATE_REQUEST } from './reducer';
import { routeActions } from 'client/router';
import { switchMap } from 'rxjs/operators/switchMap';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { mapTo } from 'rxjs/operators/mapTo';

const createRequestEpic: Epic = (actions$) =>
  actions$.ofType(getType(CREATE_REQUEST.PENDING)).pipe(
    debounceTime(300),
    switchMap((action) =>
      httpPost(api('forms/'), action.payload, CREATE_REQUEST)
    )
  );

const createSuccessEpic: Epic = (actions$) =>
  actions$.ofType(getType(CREATE_REQUEST.SUCCESS)).pipe(
    mapTo(routeActions.DASHBOARD())
  );

export const createEpic = combineEpics(
  createRequestEpic,
  createSuccessEpic
);
