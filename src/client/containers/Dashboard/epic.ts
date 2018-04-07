import { combineEpics } from 'redux-observable';
import { Epic, getType } from 'client/helpers/redux';
import { State } from 'client/store';
import { api, httpGet, httpDelete } from 'client/helpers/api';
import { getAuthenticated, getUserName } from 'client/containers/Login';
import { GET_FORMS_REQUEST, DELETE_FORM_REQUEST } from './reducer';
import { filter } from 'rxjs/operators/filter';
import { switchMap } from 'rxjs/operators/switchMap';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { mapTo } from 'rxjs/operators/mapTo';

const formsRequestPendingEpic: Epic<State> = (actions$, store) =>
  actions$.ofType(getType(GET_FORMS_REQUEST.PENDING)).pipe(
    filter(() => getAuthenticated(store.getState())),
    switchMap((action) =>
      httpGet(api(`forms/creator/${getUserName(store.getState())}`), GET_FORMS_REQUEST)
    )
  );

const deleteRequestPendingEpic: Epic = (actions$) =>
  actions$.ofType(getType(DELETE_FORM_REQUEST.PENDING)).pipe(
    debounceTime(300),
    switchMap((action) =>
      httpDelete(api(`forms/${action.payload}`), DELETE_FORM_REQUEST)
    )
  );

const deleteRequestSuccessEpic: Epic = (actions$) =>
  actions$.ofType(getType(DELETE_FORM_REQUEST.SUCCESS)).pipe(
    mapTo(GET_FORMS_REQUEST.PENDING())
  );

export const dashboardEpic = combineEpics(
  formsRequestPendingEpic,
  deleteRequestPendingEpic,
  deleteRequestSuccessEpic
);
