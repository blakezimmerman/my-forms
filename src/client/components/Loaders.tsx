import * as React from 'react';
import styled, { media, keyframes } from 'client/styling';
import DelayRender from './DelayRender';
import Error from './Error';
import { LoadingComponentProps } from 'react-loadable';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 4rem;

  ${media.mobile`
    padding: 3rem;
  `}
`;

const ComponentLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
`;

export const LoadingSpinner = styled.div`
  border: 8px solid rgba(0,0,0,0.2);
  border-top: 8px solid ${({theme}) => theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

export const Loading = () => (
  <DelayRender delay={350}>
    <LoadingWrapper>
      <LoadingSpinner/>
    </LoadingWrapper>
  </DelayRender>
);

const Warning = Error.extend`
  color: ${({theme}) => theme.colors.warning};
`;

export const ComponentLoading = (props: LoadingComponentProps) => {
  if (props.error) {
    return <Error>An Error has Occurred</Error>;
  } else if (props.timedOut) {
    return <Warning>This should not take this long...</Warning>;
  } else if (props.pastDelay) {
    return (
      <ComponentLoadingWrapper>
        <LoadingSpinner/>
      </ComponentLoadingWrapper>
    );
  } else {
    return null;
  }
};
