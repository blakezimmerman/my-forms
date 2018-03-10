import * as React from 'react';
import * as styles from '../create.styles.scss';
import { FormType, Response, Ranking as RankingQuestion } from 'models/forms';
import { Action } from 'client/shared/reduxUtils';

interface Props {
  type: FormType;
  question: RankingQuestion;
  setAnswer: (answer: Response) => Action<any>;
}

const RankingMatching = (props: Props) => (
  <div>
    <div className={styles.centeredBadge}>
      <div>Ranking Question</div>
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

export default RankingMatching;
