import * as React from 'react';
import * as styles from './questions.styles.scss';

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

const TrueFalse = (props: Props) => {
  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) =>
    props.onChange(event.currentTarget.value === 'true');

  return (
    <div className={styles.trueFalse}>
      <label>
        <input
          type='radio'
          value='true'
          checked={props.value === true}
          onChange={onChange}
        />
        True
      </label>
      <label>
        <input
          type='radio'
          value='false'
          checked={props.value === false}
          onChange={onChange}
        />
        False
      </label>
    </div>
  );
};

export default TrueFalse;
