import * as React from 'react';
import * as styles from '../create.styles.scss';
import { FormType, Response, Ranking as RankingQuestion } from 'models/forms';
import { Action } from 'client/shared/reduxUtils';
import CreateList from 'client/shared/UI/components/createList';
import FadeIn from 'client/shared/UI/transitions/fadeIn';
import Ranking from 'client/shared/UI/questions/ranking';

interface Props {
  type: FormType;
  question: RankingQuestion;
  setOptions: (options: string[]) => Action<any>;
  setAnswer: (answer: Response) => Action<any>;
}

const RankingMatching = (props: Props) => {
  const updateRanking = (value: string[]) => {
    props.setOptions(value);
    props.setAnswer(value);
  };

  return (
    <div>
      <div className={styles.centeredBadge}>
        <div>Ranking Question</div>
      </div>
      <div className={styles.optionsPrompt}>
        Provide the items to rank:
      </div>
      <CreateList
        list={props.question.options || []}
        onChange={updateRanking}
      />
      {props.type === FormType.Test &&
       props.question.options &&
       !!props.question.options.length &&
        <FadeIn>
          <div className={styles.answerPrompt}>
            Provide the correct answer:
          </div>
          <Ranking
            value={props.question.answer || props.question.options}
            onChange={props.setAnswer}
          />
        </FadeIn>
      }
    </div>
  );
};

export default RankingMatching;
