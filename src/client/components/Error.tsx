import styled from 'client/styling';

const Error = styled.div`
  display: flex;
  justify-content: center;
  padding: 4rem;
  font-size: 1.4rem;
  text-align: center;
  color: ${({theme}) => theme.colors.failure};
`;

export default Error;
