import * as React from 'react';
import * as styles from './login.styles.scss';
import { connect } from 'react-redux';
import { State } from 'client/store/rootReducer';
import { ActionDispatcher } from 'client/shared/reduxUtils';
import { NewUser } from 'models/users';
import { REGISTER_REQUEST } from './login.reducer';
import { InsertOneWriteOpResult } from 'mongodb';
import Link from 'redux-first-router-link';
import AccountForm from './accountForm';

interface Props {
  pending: boolean;
  result: InsertOneWriteOpResult;
  error: string;
  requestRegistration: ActionDispatcher<NewUser>;
}

const Register = (props: Props) => {
  const registerButton = (requestedUser: NewUser) => (event: React.MouseEvent<HTMLButtonElement>) =>
    props.requestRegistration(requestedUser);

  return (
    <div className={styles.container}>
        <h2>Create an Account</h2>
        {props.error && !props.result &&
          <h3 className={styles.error}>{props.error}</h3>
        }
        {props.result && !props.error &&
          <h3 className={styles.success}>
            {'Registration Success! '}
            <Link to='/login'>Click here to proceed to login.</Link>
          </h3>
        }
        <AccountForm submitText='Create Account' submitFn={registerButton}/>
      </div>
  );
};

const mapState = (state: State) => ({ ...state.login.registerRequest });

const mapDispatch = { requestRegistration: REGISTER_REQUEST.PENDING };

export default connect(mapState, mapDispatch)(Register);
