import styled, { Theme, media } from 'client/styling';

interface Props {
  color?: string;
  theme?: Theme;
}

const NotificationBanner = styled.div.attrs({
  color: ({color, theme}: Props) => color || theme!.colors.primary
})`
  font-weight: 700;
  font-size: 1.1rem;
  color: white;
  background-color: ${({color}) => color};
  padding: 0.8rem 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.mobile`
    padding: 0.6rem 1.2rem;
  `}
`;

export default NotificationBanner;
