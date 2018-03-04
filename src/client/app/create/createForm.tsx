import * as React from 'react';
import { FormType } from 'models/forms';

interface Props {
  type: FormType;
}

const CreateForm = (props: Props) => (
  <div>Create {props.type}</div>
);

export default CreateForm;
