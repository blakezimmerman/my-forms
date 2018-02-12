import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { routerEpic } from 'client/router/router.epics';
import { loginEpic } from 'client/app/login/login.epics';

const rootEpic = combineEpics(
  routerEpic,
  loginEpic
);

const epicMiddleware = createEpicMiddleware(rootEpic);

export default epicMiddleware;
