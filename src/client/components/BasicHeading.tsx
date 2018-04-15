import styled, { media } from 'client/styling';

const BasicHeading = styled.div`
  font-size: 1.1rem;
  padding: 1rem;
  border-bottom: 1px lightgray solid;
  position: sticky;
  top: 4.75rem;
  background-color: white;
  z-index: 1;

  ${media.mobile`
    font-size: 1.1rem;
    padding: 0.7rem;
    top: 3.5rem;
  `}
`;

export default BasicHeading;
