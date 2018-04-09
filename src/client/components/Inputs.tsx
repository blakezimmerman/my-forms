import * as React from 'react';
import styled from 'client/styling';

export const Input = styled.input`
  border: 1px solid rgba(0,0,0,0.2);
  font-family: ${({theme}) => theme.fonts.body};
  font-size: 1rem;
`;

const IndentedInput = Input.extend`
  font-size: 1.1rem;
  margin-left: 0.5rem;
`;

interface Props {
  label: string;
  value: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const LabeledInput = ({ label, value, onChange }: Props) => (
  <label>
    {label}
    <IndentedInput
      type='text'
      value={value}
      onChange={onChange}
    />
  </label>
);
