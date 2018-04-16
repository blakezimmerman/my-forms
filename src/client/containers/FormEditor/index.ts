import * as Loadable from 'react-loadable';
import { ComponentLoading } from 'client/components/Loaders';

const FormEditor = Loadable({
  loader: () => import(/* webpackChunkName: "formEditor" */ './FormEditor'),
  loading: ComponentLoading,
  delay: 350,
  timeout: 10000
});

export * from './reducer';
export default FormEditor;
