import * as React from 'react';
import * as styles from './questions.styles.scss';
import * as R from 'ramda';
import { EssayAnswerResponse } from 'models/forms';
import TextareaAutosize from 'react-autosize-textarea';

interface Props {
  value: EssayAnswerResponse;
  onChange: (value: EssayAnswerResponse) => void;
}

const EssayAnswer = (props: Props) => {
  const onChange = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    props.onChange({response: event.currentTarget.value, correct: false});
  };

  return (
    <div className={styles.essayAnswer}>
      <TextareaAutosize
        value={props.value ? props.value.response : ''}
        onChange={onChange}
        placeholder={'Enter your response...'}
      />
    </div>
  );
};

export default EssayAnswer;
