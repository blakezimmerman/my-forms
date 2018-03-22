import * as React from 'react';
import * as styles from './form.styles.scss';
import { Form } from 'models/forms';

interface Props {
  form: Form;
}

const ViewForm = (props: Props) => (
  <div className={styles.container}>
    <h2>View {props.form.name}</h2>
  </div>
);

export default ViewForm;
