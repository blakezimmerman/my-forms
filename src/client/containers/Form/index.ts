import * as Loadable from 'react-loadable';
import { ComponentLoading } from 'client/components/Loaders';

const Form = Loadable({
  loader: () => import(/* webpackChunkName: "form" */ './Form'),
  loading: ComponentLoading,
  delay: 350,
  timeout: 10000
});

export * from './reducer';
export * from './epic';
export default Form;
