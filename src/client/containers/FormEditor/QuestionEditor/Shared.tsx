import styled from 'client/styling';
import { changeLuminance } from 'client/helpers/styles';

export const BadgeWrapper = styled.div`
  display: flex;
`;

export const OptionsPrompt = styled.div`
  color: ${({theme}) => theme.colors.primaryDark};
  margin: 1rem 0 0.5rem 0;
`;

export const AnswerPrompt = styled.div`
  color: ${({theme}) => theme.colors.primaryDark};
  margin: 1rem 0 0.2rem 0;
`;
