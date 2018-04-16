import * as React from 'react';
import { FormType, Response, ShortAnswer as ShortAnswerQuestion } from 'models/forms';
import { Action } from 'client/helpers/redux';
import { BadgeWrapper, OptionsPrompt } from './Shared';
import Badge from 'client/components/Badge';
import { Input } from 'client/components/Inputs';

const LimitInput = Input.extend`
  font-size: 1.2rem;
`;

interface Props {
  question: ShortAnswerQuestion;
  setCharLimit: (limit: number) => Action<any>;
}

const ShortAnswerEditor = (props: Props) => {
  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) =>
    props.setCharLimit(parseInt(event.currentTarget.value, 10));

  return (
    <>
      <BadgeWrapper>
        <Badge>Short Answer Question</Badge>
      </BadgeWrapper>
      <OptionsPrompt>Provide the character limit:</OptionsPrompt>
      <LimitInput
        type='number'
        value={props.question.charLimit}
        onChange={onChange}
      />
    </>
  );
};

export default ShortAnswerEditor;
