import * as React from 'react';
import * as styles from './home.styles.scss';
import { connect } from 'react-redux';
import { State } from 'client/store/rootReducer';
import { ActionDispatcher } from 'client/shared/reduxUtils';
import { getAuthenticated } from '../login/login.selectors';
import { routeActions } from 'client/router/router';
import FadeIn from 'client/shared/UI/transitions/fadeIn';

interface Props {
  authenticated: boolean;
  dashboardRoute: ActionDispatcher<void>;
  registerRoute: ActionDispatcher<void>;
}

const Home = (props: Props) => {
  const toDashboard = () => props.dashboardRoute();
  const toRegister = () => props.registerRoute();

  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <h2>Get Answers With Ease</h2>
        {props.authenticated
          ? <button className={styles.getStarted} onClick={toDashboard}>
              Go To Your Dashboard To Get Started
            </button>
          : <button className={styles.getStarted} onClick={toRegister}>
              Create An Account To Get Started
            </button>
        }
      </div>
      <FadeIn>
        <div className={styles.examples} key={1}>
          <h2>With myForms you can easily...</h2>
          <div className={styles.cardsContainer}>
            <div className={styles.exampleCard}>
              <h3>Create Surveys</h3>
            </div>
            <div className={styles.exampleCard}>
              <h3>Create Tests</h3>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

const mapState = (state: State) => ({
  authenticated: getAuthenticated(state)
});

const mapDispatch = {
  dashboardRoute: routeActions.DASHBOARD,
  registerRoute: routeActions.REGISTER
};

export default connect(mapState, mapDispatch)(Home);
