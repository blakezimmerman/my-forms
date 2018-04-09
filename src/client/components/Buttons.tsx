import * as React from 'react';
import styled, { Theme } from 'client/styling';
import { getColorByBg } from 'client/helpers/styles';

interface Props {
  color?: string;
  theme?: Theme;
}

export const Button = styled.button.attrs({
  color: ({color, theme}: Props) => color || theme!.colors.primary
})`
  color: ${({color}) => getColorByBg(color)};
  background-color: ${({color}) => color};
  font-family: $body-font;
  font-size: 1.1rem;
  text-align: center;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 2px;
  transition: 0.3s;

  &:disabled, &:disabled:hover {
    color: ${({theme}) => theme.colors.disabled};
    background-color: ${({theme}) => theme.colors.disabledBG};
  }
`;

export const InvertedButton = Button.extend`
  color: ${({color}) => color};
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid ${({color}) => color};
`;

export const ClearButton = Button.extend`
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid ${({color}) => getColorByBg(color)};

  &:disabled, &:disabled:hover {
    color: ${({theme}) => theme.colors.disabled};
    background-color: rgba(0, 0, 0, 0);
  }
`;

export const IconButton = styled.button`
  outline: none;
  background-color: rgba(0, 0, 0, 0);
  text-align: center;
  border: none;
  transition: 0.3s;
  padding: 0;

  &:disabled {
    color: ${({theme}) => theme.colors.disabledBG};
  }
`;
