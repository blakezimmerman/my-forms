import { combineEpics } from 'redux-observable';
import { Epic, getType } from 'client/shared/reduxUtils';
import { api, httpGet } from 'client/shared/apiUtils';
import { GET_FORM_REQUEST } from './form.reducer';
import { switchMap } from 'rxjs/operators/switchMap';

const formRequestPendingEpic: Epic = (actions$) =>
  actions$.ofType(getType(GET_FORM_REQUEST.PENDING)).pipe(
    switchMap((action) =>
      httpGet(api(`forms/${action.payload}`), GET_FORM_REQUEST)
    )
  );

export const formEpics = combineEpics(
  formRequestPendingEpic
);
