import { combineEpics } from 'redux-observable';
import { Epic, getType } from 'client/shared/reduxUtils';
import { getUserName } from 'client/app/login/login.selectors';
import { api, httpGet, httpPost } from 'client/shared/apiUtils';
import { GET_FORM_REQUEST, SUBMIT_RESPONSES_REQUEST } from './form.reducer';
import { switchMap } from 'rxjs/operators/switchMap';

const formRequestPendingEpic: Epic = (actions$) =>
  actions$.ofType(getType(GET_FORM_REQUEST.PENDING)).pipe(
    switchMap((action) =>
      httpGet(api(`forms/${action.payload}`), GET_FORM_REQUEST)
    )
  );

const responsesSubmitPendingEpic: Epic = (actions$) =>
  actions$.ofType(getType(SUBMIT_RESPONSES_REQUEST.PENDING)).pipe(
    switchMap((action) =>
      httpPost(
        api(`forms/${action.payload.id}/submissions`),
        action.payload.responses,
        SUBMIT_RESPONSES_REQUEST
      )
    )
  );

export const formEpics = combineEpics(
  formRequestPendingEpic,
  responsesSubmitPendingEpic
);
