import * as React from 'react';
import * as styles from './login.styles.scss';
import { Action } from 'client/shared/reduxUtils';
import { User } from 'models/users';

interface Props {
  submitText: string;
  submitFn: (requestedUser: User) => (event: React.MouseEvent<HTMLButtonElement>) => Action<User | undefined>;
}

interface LocalState {
  userName: string;
  password: string;
}

class AccountForm extends React.Component<Props, LocalState> {
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

  render() {
    return (
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
          onClick={this.props.submitFn(this.state)}
          disabled={this.isDisabled()}
        >
          {this.props.submitText}
        </button>
      </div>
    );
  }
}

export default AccountForm;
