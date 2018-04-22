import * as React from 'react';
import { FormType, Response, MultipleChoice as MultipleChoiceQuestion } from 'models/forms';
import { Action } from 'client/helpers/redux';
import { BadgeWrapper, OptionsPrompt, AnswerPrompt } from './Shared';
import Badge from 'client/components/Badge';
import CreateList from 'client/components/CreateList';
import FadeInOut from 'client/components/FadeInOut';
import MultipleChoice from 'client/components/MultipleChoice';

interface Props {
  type: FormType;
  question: MultipleChoiceQuestion;
  setOptions: (options: string[]) => Action<any>;
  setAnswer: (answer: Response) => Action<any>;
}

const MultipleChoiceEditor = (props: Props) => (
  <>
    <BadgeWrapper>
      <Badge>Multiple Choice Question</Badge>
    </BadgeWrapper>
    <OptionsPrompt>Provide the options:</OptionsPrompt>
    <CreateList
      list={props.question.options || []}
      onChange={props.setOptions}
    />
    {props.type === FormType.Test &&
     props.question.options &&
     !!props.question.options.length &&
      <FadeInOut>
        <AnswerPrompt>Provide the correct answer:</AnswerPrompt>
        <MultipleChoice
          options={props.question.options}
          value={props.question.answer || []}
          onChange={props.setAnswer}
        />
      </FadeInOut>
    }
  </>
);

export default MultipleChoiceEditor;
