import * as React from 'react';
import * as styles from '../create.styles.scss';
import { FormType, Response, Matching as MatchingQuestion } from 'models/forms';
import { Action } from 'client/shared/reduxUtils';
import CreateList from 'client/shared/UI/components/createList';
import FadeIn from 'client/shared/UI/transitions/fadeIn';
import Matching from 'client/shared/UI/questions/matching';

interface Props {
  type: FormType;
  question: MatchingQuestion;
  setSetA: (setA: string[]) => Action<any>;
  setSetB: (setB: string[]) => Action<any>;
  setAnswer: (answer: Response) => Action<any>;
}

const CreateMatching = (props: Props) => (
  <div>
    <div className={styles.centeredBadge}>
      <div>Matching Question</div>
    </div>
    <div className={styles.columnContainer}>
      <div className={styles.column}>
        <div className={styles.optionsPrompt}>
          Provide the first set:
        </div>
        <CreateList
          list={props.question.setA || []}
          onChange={props.setSetA}
        />
      </div>
      <div className={styles.column}>
        <div className={styles.optionsPrompt}>
          Provide the second set:
        </div>
        <CreateList
          list={props.question.setB || []}
          onChange={props.setSetB}
        />
      </div>
    </div>
    {props.type === FormType.Test &&
     props.question.setA && !!props.question.setA.length &&
     props.question.setB && !!props.question.setB.length &&
      <FadeIn>
        <div className={styles.answerPrompt}>
          Provide the correct answer:
        </div>
        <Matching
          setA={props.question.setA}
          setB={props.question.setB}
          value={props.question.answer || []}
          onChange={props.setAnswer}
        />
      </FadeIn>
    }
  </div>
);

export default CreateMatching;
