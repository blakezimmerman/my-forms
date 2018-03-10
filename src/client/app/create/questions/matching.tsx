import * as React from 'react';
import * as styles from '../create.styles.scss';
import { FormType, Response, Matching as MatchingQuestion } from 'models/forms';
import { Action } from 'client/shared/reduxUtils';

interface Props {
  type: FormType;
  question: MatchingQuestion;
  setAnswer: (answer: Response) => Action<any>;
}

const CreateMatching = (props: Props) => (
  <div>
    <div className={styles.centeredBadge}>
      <div>Matching Question</div>
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

export default CreateMatching;
