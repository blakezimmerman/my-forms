import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { routerEpic } from 'client/router';
import { loginEpic } from 'client/containers/Login';
import { dashboardEpic } from 'client/containers/Dashboard';
import { createEpic } from 'client/containers/Create';
import { editEpic } from 'client/containers/Edit';
import { displayFormEpic } from 'client/containers/DisplayForm';

const rootEpic = combineEpics(
  routerEpic,
  loginEpic,
  dashboardEpic,
  createEpic,
  editEpic,
  displayFormEpic
);

const epicMiddleware = createEpicMiddleware(rootEpic);

export default epicMiddleware;
