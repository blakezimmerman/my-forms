import * as React from 'react';
import * as styles from '../create.styles.scss';
import { FormType, Response, ShortAnswer as ShortAnswerQuestion } from 'models/forms';
import { ActionDispatcher } from 'client/shared/reduxUtils';

interface Props {
  question: ShortAnswerQuestion;
}

const CreateShortAnswer = (props: Props) => (
  <div>
    <div className={styles.centeredBadge}>
      <div>Short Answer Question</div>
    </div>
  </div>
);

export default CreateShortAnswer;
