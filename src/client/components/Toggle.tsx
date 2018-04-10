import * as React from 'react';
import styled, { Theme } from 'client/styling';

interface Props {
  value: boolean;
  onChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  primary?: boolean;
}

interface InputProps {
  primary?: boolean;
  theme?: Theme;
}

const Slider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.disabledBG};
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 32px;

  &:before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
  }
`;

const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 56px;
  height: 32px;
`;

const SliderInput = styled.input`
  display:none;

  &:checked + ${Slider} {
    background-color: ${(props: InputProps) => props.primary
      ? props.theme!.colors.primary
      : props.theme!.colors.success
    };
  }

  &:focus + ${Slider} {
    box-shadow: ${(props: InputProps) => props.primary
      ? `box-shadow: 0 0 1px ${props.theme!.colors.primary}`
      : `box-shadow: 0 0 1px ${props.theme!.colors.success}`
    };
  }

  &:checked + ${Slider}:before {
    transform: translateX(24px);
  }
`;

const Toggle = (props: Props) => (
  <ToggleLabel>
    <SliderInput
      type='checkbox'
      checked={props.value}
      onChange={props.onChange}
      primary={props.primary}
    />
    <Slider/>
  </ToggleLabel>
);

export default Toggle;
