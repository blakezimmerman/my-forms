import * as React from 'react';
import * as styles from './home.styles.scss';
import { connect, Dispatch } from 'react-redux';
import { State } from 'client/store';
import { Action } from 'client/helpers/redux';
import { getAuthenticated } from '../Login';
import { routeActions } from 'client/router';
import FadeIn from 'client/components/FadeIn';

interface Props {
  authenticated: boolean;
  toDashboard: () => Action<void>;
  toRegister: () => Action<void>;
}

const Home = (props: Props) => (
  <div className={styles.container}>
    <div className={styles.upper}>
      <h2>Get Answers With Ease</h2>
      {props.authenticated
        ? <button className={styles.getStarted} onClick={props.toDashboard}>
            Go To Your Dashboard To Get Started
          </button>
        : <button className={styles.getStarted} onClick={props.toRegister}>
            Create An Account To Get Started
          </button>
      }
    </div>
    <FadeIn>
      <div className={styles.examples} key={1}>
        <h2>With myForms you can easily...</h2>
        <div className={styles.cardsContainer}>
          <div className={styles.exampleCard}>
            <h3>Create and Share Surveys</h3>
          </div>
          <div className={styles.exampleCard}>
            <h3>Create and Share Tests</h3>
          </div>
        </div>
      </div>
    </FadeIn>
  </div>
);

const mapState = (state: State) => ({
  authenticated: getAuthenticated(state)
});

const mapDispatch = (dispatch: Dispatch<Action<any>>) => ({
  toDashboard: () => dispatch(routeActions.DASHBOARD()),
  toRegister: () => dispatch(routeActions.REGISTER())
});

export default connect(mapState, mapDispatch)(Home);
