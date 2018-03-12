import * as React from 'react';
import * as styles from '../create.styles.scss';
import { FormType, Response, ShortAnswer as ShortAnswerQuestion } from 'models/forms';
import { Action } from 'client/shared/reduxUtils';

interface Props {
  question: ShortAnswerQuestion;
  setCharLimit: (limit: number) => Action<any>;
}

const CreateShortAnswer = (props: Props) => {
  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) =>
    props.setCharLimit(parseInt(event.currentTarget.value, 10));

  return (
    <div>
      <div className={styles.centeredBadge}>
        <div>Short Answer Question</div>
      </div>
      <div className={styles.optionsPrompt}>
        Provide the character limit:
      </div>
      <input
        className={styles.limitInput}
        type='number'
        value={props.question.charLimit}
        onChange={onChange}
      />
    </div>
  );
};

export default CreateShortAnswer;
