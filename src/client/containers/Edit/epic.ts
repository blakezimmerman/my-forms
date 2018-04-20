import { combineEpics } from 'redux-observable';
import { Epic, getType } from 'client/helpers/redux';
import { State } from 'client/store';
import { api, httpGet, httpPut } from 'client/helpers/api';
import { GET_EDIT_FORM_REQUEST, EDIT_REQUEST } from './reducer';
import { SET_FORM } from '../FormEditor';
import { routeActions } from 'client/router';
import { switchMap } from 'rxjs/operators/switchMap';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { mapTo } from 'rxjs/operators/mapTo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

const getEditFormRequestEpic: Epic<State> = (actions$, store) =>
  actions$.ofType(getType(GET_EDIT_FORM_REQUEST.PENDING)).pipe(
    switchMap((action) =>
      httpGet(api(`forms/${(store.getState().location.payload as any).id}`), GET_EDIT_FORM_REQUEST)
    )
  );

const getEditFormSuccessEpic: Epic = (actions$) =>
  actions$.ofType(getType(GET_EDIT_FORM_REQUEST.SUCCESS)).pipe(
    switchMap((action) =>
      Observable.of(SET_FORM(action.payload))
    )
  );

const editRequestEpic: Epic<State> = (actions$, store) =>
  actions$.ofType(getType(EDIT_REQUEST.PENDING)).pipe(
    debounceTime(300),
    switchMap((action) =>
      httpPut(
        api(`forms/${(store.getState().location.payload as any).id}`),
        action.payload, EDIT_REQUEST
      )
    )
  );

const editSuccessEpic: Epic = (actions$) =>
  actions$.ofType(getType(EDIT_REQUEST.SUCCESS)).pipe(
    mapTo(routeActions.DASHBOARD())
  );

export const editEpic = combineEpics(
  getEditFormRequestEpic,
  getEditFormSuccessEpic,
  editRequestEpic,
  editSuccessEpic
);
