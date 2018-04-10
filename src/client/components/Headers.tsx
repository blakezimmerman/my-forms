import styled from 'client/styling';

export const H1 = styled.h1`
  font-family: ${({theme}) => theme.fonts.heading};
  font-weight: 400;
`;

export const H2 = styled.h2`
  font-family: ${({theme}) => theme.fonts.heading};
  font-weight: 400;
  font-size: 1.5rem;
`;
