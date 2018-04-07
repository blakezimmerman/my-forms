import * as React from 'react';
import * as styles from './toggle.styles.scss';

interface Props {
  value: boolean;
  onChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  primary: boolean;
}

const Toggle = (props: Props) => (
  <label className={`${styles.toggle} ${!props.primary && styles.secondary}`}>
    <input
      type='checkbox'
      checked={props.value}
      onChange={props.onChange}
    />
    <span className={styles.slider}/>
  </label>
);

export default Toggle;
