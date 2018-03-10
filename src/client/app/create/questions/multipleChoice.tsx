import * as React from 'react';
import * as styles from '../create.styles.scss';
import { FormType, Response, MultipleChoice as MultipleChoiceQuestion } from 'models/forms';
import { Action } from 'client/shared/reduxUtils';

interface Props {
  type: FormType;
  question: MultipleChoiceQuestion;
  setAnswer: (answer: Response) => Action<any>;
}

const CreateMultipleChoice = (props: Props) => (
  <div>
    <div className={styles.centeredBadge}>
      <div>Multiple Choice Question</div>
    </div>
    {props.type === FormType.Test &&
      <>
        <div className={styles.answerPrompt}>
          Provide the correct answer:
        </div>
      </>
    }
  </div>
);

export default CreateMultipleChoice;
