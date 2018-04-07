import * as React from 'react';
import * as styles from './questions.styles.scss';
import * as R from 'ramda';
import { ShortAnswerResponse } from 'models/forms';
import TextareaAutosize from 'react-autosize-textarea';

interface Props {
  charLimit: number;
  value: ShortAnswerResponse;
  onChange: (value: ShortAnswerResponse) => void;
}

const ShortAnswer = (props: Props) => {
  const onChange = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    if (event.currentTarget.value.length <= props.charLimit) {
      props.onChange({response: event.currentTarget.value, correct: false});
    }
  };

  return (
    <div className={styles.shortAnswer}>
      <TextareaAutosize
        value={props.value ? props.value.response : ''}
        onChange={onChange}
        placeholder={`Enter your response... (${props.charLimit} character limit)`}
      />
    </div>
  );
};

export default ShortAnswer;
