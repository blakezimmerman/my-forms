import * as Loadable from 'react-loadable';
import { ComponentLoading } from 'client/components/Loaders';

const DisplayForm = Loadable({
  loader: () => import(/* webpackChunkName: "displayForm" */ './DisplayForm'),
  loading: ComponentLoading,
  delay: 350,
  timeout: 10000
});

export * from './reducer';
export * from './epic';
export default DisplayForm;
