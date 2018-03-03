import * as React from 'react';
import * as styles from './dashboard.styles.scss';
import { connect, Dispatch } from 'react-redux';
import { State } from 'client/store/rootReducer';
import { Action } from 'client/shared/reduxUtils';
import { getUserName } from '../login/login.selectors';
import { routeActions } from 'client/router/router';

interface Props {
  userName: string;
  toCreateSurvey: () => Action<void>;
  toCreateTest: () => Action<void>;
}

const Dashboard = (props: Props) => (
  <div className={styles.container}>
    <h2>Welcome, {props.userName}</h2>
    <div>
      <button className={styles.createButton} onClick={props.toCreateSurvey}>
        Create Survey
      </button>
      <button className={styles.createButton} onClick={props.toCreateTest}>
        Create Test
      </button>
    </div>
    <h2>Your Forms</h2>
  </div>
);

const mapState = (state: State) => ({
  userName: getUserName(state)
});

const mapDispatch = (dispatch: Dispatch<Action<any>>) => ({
  toCreateSurvey: () => dispatch(routeActions.CREATE_SURVEY()),
  toCreateTest: () => dispatch(routeActions.CREATE_TEST())
});

export default connect(mapState, mapDispatch)(Dashboard);
