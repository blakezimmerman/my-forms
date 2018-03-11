import * as React from 'react';
import * as styles from './questions.styles.scss';
import * as R from 'ramda';
import { MultipleChoiceResponse } from 'models/forms';

interface Props {
  options: string[];
  value: MultipleChoiceResponse;
  onChange: (value: MultipleChoiceResponse) => void;
}

const MultipleChoice = (props: Props) => {
  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    event.currentTarget.checked
      ? props.onChange(R.append(event.currentTarget.value, props.value))
      : props.onChange(R.without([event.currentTarget.value], props.value));
  };

  return (
    <div className={styles.multipleChoice}>
      {props.options.map((option) =>
        <label key={option}>
          <input
            type='checkbox'
            value={option}
            checked={R.contains(option, props.value)}
            onChange={onChange}
          />
          {option}
        </label>
      )}
    </div>
  );
};

export default MultipleChoice;
