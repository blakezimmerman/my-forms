import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { routerEpic } from 'client/router/router.epics';
import { loginEpic } from 'client/app/login/login.epics';
import { dashboardEpics } from 'client/app/dashboard/dashboard.epics';
import { createEpics } from 'client/app/create/create.epics';
import { formEpics } from 'client/app/form/form.epics';

const rootEpic = combineEpics(
  routerEpic,
  loginEpic,
  dashboardEpics,
  createEpics,
  formEpics
);

const epicMiddleware = createEpicMiddleware(rootEpic);

export default epicMiddleware;
