import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { routerEpic } from '../router/router.epics';

const rootEpic = combineEpics(routerEpic);

const epicMiddleware = createEpicMiddleware(rootEpic);

export default epicMiddleware;
