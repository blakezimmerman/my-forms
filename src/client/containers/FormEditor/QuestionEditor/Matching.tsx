import * as React from 'react';
import styled from 'client/styling';
import { FormType, Response, Matching as MatchingQuestion } from 'models/forms';
import { Action } from 'client/helpers/redux';
import { BadgeWrapper, OptionsPrompt, AnswerPrompt } from './Shared';
import Badge from 'client/components/Badge';
import CreateList from 'client/components/CreateList';
import FadeInOut from 'client/components/FadeInOut';
import Matching from 'client/components/Matching';

const ColumnWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Column = styled.div`
  margin-right: 1rem;

  &:last-of-type {
    margin: 0;
  }
`;

interface Props {
  type: FormType;
  question: MatchingQuestion;
  setSetA: (setA: string[]) => Action<any>;
  setSetB: (setB: string[]) => Action<any>;
  setAnswer: (answer: Response) => Action<any>;
}

const MatchingEditor = (props: Props) => (
  <>
    <BadgeWrapper>
      <Badge>Matching Question</Badge>
    </BadgeWrapper>
    <ColumnWrapper>
      <Column>
        <OptionsPrompt>Provide the first set:</OptionsPrompt>
        <CreateList
          list={props.question.setA || []}
          onChange={props.setSetA}
        />
      </Column>
      <Column>
        <OptionsPrompt>Provide the second set:</OptionsPrompt>
        <CreateList
          list={props.question.setB || []}
          onChange={props.setSetB}
        />
      </Column>
    </ColumnWrapper>
    {props.type === FormType.Test &&
     props.question.setA && !!props.question.setA.length &&
     props.question.setB && !!props.question.setB.length &&
      <FadeInOut>
        <AnswerPrompt>Provide the correct answer:</AnswerPrompt>
        <Matching
          setA={props.question.setA}
          setB={props.question.setB}
          value={props.question.answer || []}
          onChange={props.setAnswer}
        />
      </FadeInOut>
    }
  </>
);

export default MatchingEditor;
