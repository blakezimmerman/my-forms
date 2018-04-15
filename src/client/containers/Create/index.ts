import * as Loadable from 'react-loadable';
import { ComponentLoading } from 'client/components/Loaders';

const CreateForm = Loadable({
  loader: () => import(/* webpackChunkName: "createForm" */ './CreateForm'),
  loading: ComponentLoading,
  delay: 350,
  timeout: 10000
});

export * from './reducer';
export * from './epic';
export default CreateForm;
