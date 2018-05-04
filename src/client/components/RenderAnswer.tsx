import * as React from 'react';
import styled from 'client/styling';
import { changeLuminance } from 'client/helpers/styles';
import { Question, QuestionType, Response, MatchingResponse } from 'models/forms';
import { match, is } from 'client/helpers/misc';

const AnswerWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
`;

const AnswerLabel = styled.span`
  color: ${({theme}) => theme.colors.primaryDark};
  margin-right: 0.5rem;
`;

interface Props {
  label: string;
  questionType: QuestionType;
  answer: Response;
}

const RenderAnswer = ({ label, questionType, answer }: Props) => (
  <AnswerWrapper>
    <AnswerLabel>{label}</AnswerLabel>
    {
      match<QuestionType, JSX.Element>(questionType)
        .on(is(QuestionType.TrueFalse), (type) =>
          <span>{answer.toString()[0].toUpperCase() + answer.toString().slice(1)}</span>
        )
        .on(is(QuestionType.MultipleChoice), (type) =>
          <span>{answer.toString().replace(new RegExp(',', 'g'), ', ')}</span>
        )
        .on(is(QuestionType.ShortAnswer), (type) =>
          <span>{((answer as any).response || '').toString()}</span>
        )
        .on(is(QuestionType.EssayAnswer), (type) =>
          <span>{((answer as any).response || '').toString()}</span>
        )
        .on(is(QuestionType.Matching), (type) =>
          <span>{
            (answer as MatchingResponse)
              .map((x: number) => String.fromCharCode(x + 65))
              .toString().replace(new RegExp(',', 'g'), ', ')
          }</span>
        )
        .on(is(QuestionType.Ranking), (type) =>
        <span>{answer.toString().replace(new RegExp(',', 'g'), ', ')}</span>
        )
        .otherwise((type) =>
          <span>{(answer || '').toString()}</span>
        )
    }
  </AnswerWrapper>
);

export default RenderAnswer;
