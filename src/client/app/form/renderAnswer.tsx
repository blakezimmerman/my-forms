import * as React from 'react';
import * as styles from './form.styles.scss';
import { Question, QuestionType } from 'models/forms';
import { match, is } from 'client/shared/miscUtils';

interface Props {
  question: Question;
}

const RenderAnswer = ({ question }: Props) => {
  const answer = (question as any).answer;

  return (
    <div className={styles.correctAnswer}>
      <span className={styles.correctText}>Correct Answer:</span>
      {
        match<QuestionType, JSX.Element>(question.type)
          .on(is(QuestionType.TrueFalse), (type) =>
            <span>{answer.toString()[0].toUpperCase() + answer.toString().slice(1)}</span>
          )
          .on(is(QuestionType.MultipleChoice), (type) =>
            <span>{answer.toString().replace(new RegExp(',', 'g'), ', ')}</span>
          )
          .on(is(QuestionType.Matching), (type) =>
            <span>{
              answer
                .map((x: number) => String.fromCharCode(x + 65))
                .toString().replace(new RegExp(',', 'g'), ', ')
            }</span>
          )
          .on(is(QuestionType.Ranking), (type) =>
          <span>{answer.toString().replace(new RegExp(',', 'g'), ', ')}</span>
          )
          .otherwise((type) =>
            <span>{(question as any).answer.toString()}</span>
          )
      }
    </div>
  );
};

export default RenderAnswer;
