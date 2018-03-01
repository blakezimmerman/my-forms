import * as React from 'react';
import * as styles from './login.styles.scss';
import { connect } from 'react-redux';
import { State } from 'client/store/rootReducer';
import { ActionDispatcher } from 'client/shared/reduxUtils';
import { User } from 'models/users';
import { LOGIN_REQUEST } from './login.reducer';
import { InsertOneWriteOpResult } from 'mongodb';
import Link from 'redux-first-router-link';
import AccountForm from './accountForm';

interface Props {
  pending: boolean;
  result: string;
  error: string;
  requestLogin: ActionDispatcher<User>;
}

const Login = (props: Props) => {
  const loginButton = (requestedUser: User) => (event: React.MouseEvent<HTMLButtonElement>) =>
    props.requestLogin(requestedUser);

  return (
    <div className={styles.container}>
      <h2>Sign in</h2>
      {props.error && <h3 className={styles.error}>{props.error}</h3>}
      <AccountForm submitText='Log In' submitFn={loginButton}/>
      <div>
        {'Not Registered? '}
        <Link to='/register'>Click here to make an account!</Link>
      </div>
    </div>
  );
};

const mapState = (state: State) => ({ ...state.login.loginRequest });

const mapDispatch = { requestLogin: LOGIN_REQUEST.PENDING };

export default connect(mapState, mapDispatch)(Login);
