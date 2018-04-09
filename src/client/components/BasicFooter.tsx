import styled, { media } from 'client/styling';

const BasicFooter = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  width: calc(100% - 4rem);
  z-index: 1;
  background-color: ${({theme}) => theme.colors.primary};

  ${media.mobile`
    padding: 0.7rem 1.4rem;
    width: calc(100% - 2.8rem);
  `}
`;

export default BasicFooter;
