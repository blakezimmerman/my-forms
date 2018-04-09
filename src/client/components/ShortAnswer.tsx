import * as React from 'react';
import styled from 'client/styling';
import * as R from 'ramda';
import { ShortAnswerResponse } from 'models/forms';
import TextArea from './TextArea';

interface Props {
  charLimit: number;
  value: ShortAnswerResponse;
  onChange: (value: ShortAnswerResponse) => void;
}

const ShortAnswerWrapper = styled.div`
  padding: 0.5rem 0;
`;

const ShortAnswer = (props: Props) => {
  const onChange = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    if (event.currentTarget.value.length <= props.charLimit) {
      props.onChange({response: event.currentTarget.value, correct: false});
    }
  };

  return (
    <ShortAnswerWrapper>
      <TextArea
        value={props.value ? props.value.response : ''}
        onChange={onChange}
        placeholder={`Enter your response... (${props.charLimit} character limit)`}
      />
    </ShortAnswerWrapper>
  );
};

export default ShortAnswer;
