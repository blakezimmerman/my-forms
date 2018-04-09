import styled, { Theme } from 'client/styling';

interface Props {
  color?: string;
  theme?: Theme;
}

const RadioButton = styled.input.attrs({
  type: 'radio',
  color: ({color, theme}: Props) => color || theme!.colors.primary
})`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border-radius: 50%;
  width: 16px;
  height: 16px;

  border: 2px solid rgba(0,0,0,0.2);
  transition: 0.2s all linear;
  outline: none;
  margin-right: 5px;

  position: relative;
  top: 5px;

  &:checked {
    border: 6px solid ${({color}) => color};
  }
`;

export default RadioButton;
