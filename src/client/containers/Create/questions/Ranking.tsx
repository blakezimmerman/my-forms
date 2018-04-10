import * as React from 'react';
import { FormType, Response, Ranking as RankingQuestion } from 'models/forms';
import { Action } from 'client/helpers/redux';
import { BadgeWrapper, OptionsPrompt, AnswerPrompt } from './Shared';
import Badge from 'client/components/Badge';
import CreateList from 'client/components/CreateList';
import FadeIn from 'client/components/FadeIn';
import Ranking from 'client/components/Ranking';

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
    <>
      <BadgeWrapper>
        <Badge>Ranking Question</Badge>
      </BadgeWrapper>
      <OptionsPrompt>Provide the items to rank:</OptionsPrompt>
      <CreateList
        list={props.question.options || []}
        onChange={updateRanking}
      />
      {props.type === FormType.Test &&
       props.question.options &&
       !!props.question.options.length &&
        <FadeIn>
          <AnswerPrompt>Provide the correct answer:</AnswerPrompt>
          <Ranking
            value={props.question.answer || props.question.options}
            onChange={props.setAnswer}
          />
        </FadeIn>
      }
    </>
  );
};

export default RankingMatching;
