import styled, { Theme } from 'client/styling';

interface Props {
  color?: string;
  theme?: Theme;
}

const Select = styled.select.attrs({
  color: ({color, theme}: Props) => color || theme!.colors.primary
})`
  border: 1px ${({color}) => color} solid;
  border-radius: 2px;
  background-color: white;
  font-family: ${({theme}) => theme.fonts.body};
  font-weight: 300;
  font-size: 1rem;
  height: 2.1rem;
`;

export default Select;
