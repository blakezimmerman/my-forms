import * as React from 'react';
import styled from 'client/styling';
import { changeLuminance } from 'client/helpers/styles';
import { Question, QuestionType } from 'models/forms';
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
  question: Question;
}

const RenderAnswer = ({ question }: Props) => {
  const answer = (question as any).answer;

  return (
    <AnswerWrapper>
      <AnswerLabel>Correct Answer:</AnswerLabel>
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
    </AnswerWrapper>
  );
};

export default RenderAnswer;
