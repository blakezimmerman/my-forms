import styled, { Theme } from 'client/styling';
import { getColorByBg } from 'client/helpers/styles';

interface Props {
  color?: string;
  theme?: Theme;
}

const Badge = styled.div.attrs({
  color: ({color, theme}: Props) => color || theme!.colors.primary
})`
  background-color: ${({color}) => color};
  color: ${({color}) => getColorByBg(color)};
  display: inline;
  text-align: center;
  border-radius: 1rem;
  padding: 0.25rem 0.6rem;
  font-size: 1rem;
`;

export default Badge;
