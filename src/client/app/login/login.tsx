import * as React from 'react';
import * as styles from './login.styles.scss';
import { connect } from 'react-redux';
import { State } from 'client/store/rootReducer';
import { ActionDispatcher } from 'client/shared/reduxUtils';
import { NewUser } from 'models/users';
import { LOGIN_REQUEST } from './login.reducer';
import Link from 'redux-first-router-link';

interface Props {
  pending: boolean;
  result: string;
  error: string;
  requestLogin: ActionDispatcher<NewUser>;
}

interface LocalState {
  userName: string;
  password: string;
}

class Login extends React.Component<Props, LocalState> {
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

  loginButton = (requestedUser: NewUser) => (event: React.MouseEvent<HTMLButtonElement>) =>
    this.props.requestLogin(requestedUser)

  render() {
    return (
      <div className={styles.container}>
        <h2>Sign in</h2>
        {this.props.error && <h3 className={styles.error}>{this.props.error}</h3>}
        <div className={styles.inputs}>
          <label>
            {'Username:'}
            <input
              type='text'
              value={this.state.userName}
              onChange={this.updateUserName}
            />
          </label>
          <label>
            {'Password:'}
            <input
              type='password'
              value={this.state.password}
              onChange={this.updatePassword}
            />
          </label>
          <button
            onClick={this.loginButton(this.state)}
            disabled={this.isDisabled()}
          >
            Log In
          </button>
        </div>
        <div>
          {'Not Registered? '}
          <Link to='/register'>Click here to make an account!</Link>
        </div>
      </div>
    );
  }
}

const mapState = (state: State) => ({ ...state.login.loginRequest });

const mapDispatch = { requestLogin: LOGIN_REQUEST.PENDING };

export default connect(mapState, mapDispatch)(Login);
