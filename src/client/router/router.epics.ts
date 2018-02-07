import { combineEpics } from 'redux-observable';
import { mapTo } from 'rxjs/operators';
import { Epic, getType } from 'client/shared/reduxUtils';
import { routeActions } from './router';

const homeEpic: Epic = (actions$) =>
  actions$.ofType(getType(routeActions.HOME)).pipe(
    mapTo(routeActions.LOGIN())
  );

export const routerEpic = combineEpics(
  homeEpic
);
