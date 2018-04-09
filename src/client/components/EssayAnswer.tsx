import * as React from 'react';
import styled from 'client/styling';
import * as R from 'ramda';
import { EssayAnswerResponse } from 'models/forms';
import TextArea from './TextArea';

interface Props {
  value: EssayAnswerResponse;
  onChange: (value: EssayAnswerResponse) => void;
}

const EssayAnswerWrapper = styled.div`
  padding: 0.5rem 0;
`;

const EssayAnswer = (props: Props) => {
  const onChange = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    props.onChange({response: event.currentTarget.value, correct: false});
  };

  return (
    <EssayAnswerWrapper>
      <TextArea
        value={props.value ? props.value.response : ''}
        onChange={onChange}
        placeholder={'Enter your response...'}
      />
    </EssayAnswerWrapper>
  );
};

export default EssayAnswer;
