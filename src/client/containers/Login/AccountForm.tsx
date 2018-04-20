import * as React from 'react';
import styled, { withTheme, Theme } from 'client/styling';
import { Action } from 'client/helpers/redux';
import { User } from 'models/users';
import { LabeledInput } from 'client/components/Inputs';
import { Button } from 'client/components/Buttons';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  font-size: 1.1rem;
`;

const FormButton = Button.extend`
  margin: 1rem 0 1.5rem 0;
  padding: 0.6rem 1rem;
`;

interface Props {
  theme: Theme;
  submitText: string;
  submitFn: (requestedUser: User) => (event: React.MouseEvent<HTMLButtonElement>) => Action<User | undefined>;
}

interface LocalState {
  userName: string;
  password: string;
}

class AccountForm extends React.Component<Props, LocalState> {
  state = {
    userName: '',
    password: ''
  };

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
      <FormWrapper>
        <LabeledInput
          label='Username '
          type='text'
          value={this.state.userName}
          onChange={this.updateUserName}
        />
        <LabeledInput
          label='Password '
          type='password'
          value={this.state.password}
          onChange={this.updatePassword}
        />
        <FormButton
          color={this.props.theme.colors.primary}
          onClick={this.props.submitFn(this.state)}
          disabled={this.isDisabled()}
        >
          {this.props.submitText}
        </FormButton>
      </FormWrapper>
    );
  }
}

export default withTheme(AccountForm);
