import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { routerEpic } from 'client/router';
import { loginEpic } from 'client/containers/Login';
import { dashboardEpic } from 'client/containers/Dashboard';
import { createEpic } from 'client/containers/Create';
import { formEpic } from 'client/containers/Form';

const rootEpic = combineEpics(
  routerEpic,
  loginEpic,
  dashboardEpic,
  createEpic,
  formEpic
);

const epicMiddleware = createEpicMiddleware(rootEpic);

export default epicMiddleware;
