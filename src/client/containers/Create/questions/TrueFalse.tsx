import * as React from 'react';
import { FormType, Response, TrueFalse as TrueFalseQuestion } from 'models/forms';
import { Action } from 'client/helpers/redux';
import { BadgeWrapper, AnswerPrompt } from './Shared';
import Badge from 'client/components/Badge';
import TrueFalse from 'client/components/TrueFalse';

interface Props {
  type: FormType;
  question: TrueFalseQuestion;
  setAnswer: (answer: Response) => Action<any>;
}

const CreateTrueFalse = (props: Props) => {
  return (
    <>
      <BadgeWrapper>
        <Badge>True/False Question</Badge>
      </BadgeWrapper>
      {props.type === FormType.Test &&
        <>
          <AnswerPrompt>Provide the correct answer:</AnswerPrompt>
          <TrueFalse value={props.question.answer} onChange={props.setAnswer}/>
        </>
      }
    </>
  );
};

export default CreateTrueFalse;
