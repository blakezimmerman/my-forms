import * as React from 'react';
import * as styles from './dashboard.styles.scss';
import { connect } from 'react-redux';
import { State } from 'client/store/rootReducer';
import { ActionDispatcher } from 'client/shared/reduxUtils';
import { getUserName } from '../login/login.selectors';

interface Props {
  userName: string;
}

const Dashboard = (props: Props) => (
  <div className={styles.container}>
    <h2>Welcome, {props.userName}</h2>
    <div>
      <button className={styles.createButton}>Create Survey</button>
      <button className={styles.createButton}>Create Test</button>
    </div>
    <h2>Your Forms</h2>
  </div>
);

const mapState = (state: State) => ({
  userName: getUserName(state)
});

const mapDispatch = {

};

export default connect(mapState, mapDispatch)(Dashboard);
