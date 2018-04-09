import * as React from 'react';
import styled from 'client/styling';
import { TrueFalseResponse } from 'models/forms';
import RadioButton from './RadioButton';

interface Props {
  value: TrueFalseResponse | undefined;
  onChange: (value: TrueFalseResponse) => void;
}

const BlockLabel = styled.label`
  display: block;
`;

const TrueFalse = (props: Props) => {
  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) =>
    props.onChange(event.currentTarget.value === 'true');

  return (
    <>
      <BlockLabel>
        <RadioButton
          value='true'
          checked={props.value === true}
          onChange={onChange}
        />
        True
      </BlockLabel>
      <BlockLabel>
        <RadioButton
          value='false'
          checked={props.value === false}
          onChange={onChange}
        />
        False
      </BlockLabel>
    </>
  );
};

export default TrueFalse;
