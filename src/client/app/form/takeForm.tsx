import * as React from 'react';
import * as styles from './form.styles.scss';
import { Form } from 'models/forms';

interface Props {
  form: Form;
}

const TakeForm = (props: Props) => (
  <div className={styles.container}>
    <h2>Take {props.form.name}</h2>
  </div>
);

export default TakeForm;
