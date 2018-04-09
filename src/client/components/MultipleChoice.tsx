import * as React from 'react';
import styled from 'client/styling';
import * as R from 'ramda';
import { MultipleChoiceResponse } from 'models/forms';
import Checkbox from './Checkbox';

interface Props {
  options: string[];
  value: MultipleChoiceResponse;
  onChange: (value: MultipleChoiceResponse) => void;
}

const BlockLabel = styled.label`
  display: block;
`;

const MultipleChoice = (props: Props) => {
  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    event.currentTarget.checked
      ? props.onChange(R.append(event.currentTarget.value, props.value))
      : props.onChange(R.without([event.currentTarget.value], props.value));
  };

  return (
    <>
      {props.options.map((option) =>
        <BlockLabel key={option}>
          <Checkbox
            value={option}
            checked={R.contains(option, props.value || '')}
            onChange={onChange}
          />
          {option}
        </BlockLabel>
      )}
    </>
  );
};

export default MultipleChoice;
