import { combineEpics } from 'redux-observable';
import { Epic, getType } from 'client/shared/reduxUtils';
import { State } from 'client/store/rootReducer';
import { api, httpGet, httpDelete } from 'client/shared/apiUtils';
import { getAuthenticated, getUserName } from 'client/app/login/login.selectors';
import { GET_FORMS_REQUEST, DELETE_FORM_REQUEST } from './dashboard.reducer';
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

export const dashboardEpics = combineEpics(
  formsRequestPendingEpic,
  deleteRequestPendingEpic,
  deleteRequestSuccessEpic
);
