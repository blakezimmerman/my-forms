import * as React from 'react';
import styled, { media } from 'client/styling';
import { connect, Dispatch } from 'react-redux';
import { State } from 'client/store';
import { Action } from 'client/helpers/redux';
import { getAuthenticated } from '../Login';
import { routeActions } from 'client/router';
import { Button } from 'client/components/Buttons';
import Examples from './Examples';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
`;

const UpperSection = styled.div`
  width: 100%;
  background-color: ${({theme}) => theme.colors.primary};
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeHeader = styled.h2`
  font-weight: 400;
  font-size: 1.8rem;
  text-align: center;
  margin: 3rem 0 0;
`;

const GetStartedButton = Button.extend`
  color: ${({theme}) => theme.colors.primary};
  background-color: white;
  font-size: 1.3rem;
  margin: 3rem 1rem;
  padding: 1rem 1.2rem;

  ${media.mobile`
    font-size: 1.15rem;
    padding: 0.8rem 1rem;
  `}
`;

interface Props {
  authenticated: boolean;
  toDashboard: () => Action<void>;
  toRegister: () => Action<void>;
}

const Home = (props: Props) => (
  <HomeWrapper>
    <UpperSection>
      <HomeHeader>Get Answers With Ease</HomeHeader>
      {props.authenticated
        ? <GetStartedButton onClick={props.toDashboard}>
            Go To Your Dashboard To Get Started
          </GetStartedButton>
        : <GetStartedButton onClick={props.toRegister}>
            Create An Account To Get Started
          </GetStartedButton>
      }
    </UpperSection>
    <Examples/>
  </HomeWrapper>
);

const mapState = (state: State) => ({
  authenticated: getAuthenticated(state)
});

const mapDispatch = (dispatch: Dispatch<Action<any>>) => ({
  toDashboard: () => dispatch(routeActions.DASHBOARD()),
  toRegister: () => dispatch(routeActions.REGISTER())
});

export default connect(mapState, mapDispatch)(Home);
