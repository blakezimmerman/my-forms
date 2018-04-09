import styled, { media } from 'client/styling';

const BasicHeader = styled.div`
  font-size: 1.1rem;
  padding: 1rem;
  border-bottom: 1px lightgray solid;
  position: -webkit-sticky;
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

export default BasicHeader;
