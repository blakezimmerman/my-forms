import { combineEpics } from 'redux-observable';
import { Epic, getType } from 'client/shared/reduxUtils';
import { State } from 'client/store/rootReducer';
import { api, httpGet } from 'client/shared/apiUtils';
import { getAuthenticated, getUserName } from 'client/app/login/login.selectors';
import { GET_FORMS_REQUEST } from './dashboard.reducer';
import { filter } from 'rxjs/operators/filter';
import { switchMap } from 'rxjs/operators/switchMap';

const formsRequestPendingEpic: Epic<State> = (actions$, store) =>
  actions$.ofType(getType(GET_FORMS_REQUEST.PENDING)).pipe(
    filter(() => getAuthenticated(store.getState())),
    switchMap((action) =>
      httpGet(api(`forms/creator/${getUserName(store.getState())}`), GET_FORMS_REQUEST)
    )
  );

export const dashboardEpics = combineEpics(
  formsRequestPendingEpic
);
