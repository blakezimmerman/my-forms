import styled from 'client/styling';

const Loading = styled.div`
  display: flex;
  justify-content: center;
  padding: 4rem;
  font-size: 1.4rem;
  color: ${({theme}) => theme.colors.primary};
  content: 'Loading...'
`;

export default Loading;
