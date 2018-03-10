import * as React from 'react';
import * as styles from '../create.styles.scss';
import { FormType, Response, TrueFalse as TrueFalseQuestion } from 'models/forms';
import { Action } from 'client/shared/reduxUtils';
import TrueFalse from 'client/shared/UI/questions/trueFalse';

interface Props {
  type: FormType;
  question: TrueFalseQuestion;
  setAnswer: (answer: Response) => Action<any>;
}

const CreateTrueFalse = (props: Props) => {
  return (
    <div>
      <div className={styles.centeredBadge}>
        <div>True/False Question</div>
      </div>
      {props.type === FormType.Test &&
        <>
          <div className={styles.answerPrompt}>
            Provide the correct answer:
          </div>
          <TrueFalse value={props.question.answer!} onChange={props.setAnswer}/>
        </>
      }
    </div>
  );
};

export default CreateTrueFalse;
