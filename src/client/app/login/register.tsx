import * as React from 'react';
import * as styles from './login.styles.scss';
import { connect } from 'react-redux';
import { State } from 'client/store/rootReducer';
import { ActionDispatcher } from 'client/shared/reduxUtils';
import { NewUser } from 'models/users';
import { REGISTER_REQUEST } from './login.reducer';
import { InsertOneWriteOpResult } from 'mongodb';
import Link from 'redux-first-router-link';

interface Props {
  pending: boolean;
  result: InsertOneWriteOpResult;
  error: string;
  requestRegistration: ActionDispatcher<NewUser>;
}

interface LocalState {
  userName: string;
  password: string;
}

class Register extends React.Component<Props, LocalState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };
  }

  isDisabled = () => !(this.state.userName && this.state.password);

  updateUserName = (event: React.FormEvent<HTMLInputElement>) =>
    this.setState({
      userName: event.currentTarget.value
    })

  updatePassword = (event: React.FormEvent<HTMLInputElement>) =>
    this.setState({
      password: event.currentTarget.value
    })

  registerButton = (requestedUser: NewUser) => (event: React.MouseEvent<HTMLButtonElement>) =>
    this.props.requestRegistration(requestedUser)

  render() {
    return (
      <div className={styles.container}>
        <h2>Create an Account</h2>
        {this.props.error && !this.props.result &&
          <h3 className={styles.error}>{this.props.error}</h3>
        }
        {this.props.result && !this.props.error &&
          <h3 className={styles.success}>
            {'Registration Success! '}
            <Link to='/login'>Click here to proceed to login.</Link>
          </h3>
        }
        <div className={styles.inputs}>
          <label>
            {'Username '}
            <input
              type='text'
              value={this.state.userName}
              onChange={this.updateUserName}
            />
          </label>
          <label>
            {'Password '}
            <input
              type='password'
              value={this.state.password}
              onChange={this.updatePassword}
            />
          </label>
          <button
            onClick={this.registerButton(this.state)}
            disabled={this.isDisabled()}
          >
            Create Account
          </button>
        </div>
      </div>
    );
  }
}

const mapState = (state: State) => ({ ...state.login.registerRequest });

const mapDispatch = { requestRegistration: REGISTER_REQUEST.PENDING };

export default connect(mapState, mapDispatch)(Register);
