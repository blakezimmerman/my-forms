import * as React from 'react';
import styled from 'client/styling';
import { connect } from 'react-redux';
import { State } from 'client/store';
import { ActionDispatcher } from 'client/helpers/redux';
import { User } from 'models/users';
import { REGISTER_REQUEST } from './reducer';
import { InsertOneWriteOpResult } from 'mongodb';
import Link from 'redux-first-router-link';
import { LoginWrapper, LoginHeader, Error } from './Login';
import AccountForm from './AccountForm';

interface Props {
  pending: boolean;
  result: InsertOneWriteOpResult;
  error: string;
  requestRegistration: ActionDispatcher<User>;
}

const Success = styled.h3`
  color: ${({theme}) => theme.colors.success};
`;

const Register = (props: Props) => {
  const registerButton = (requestedUser: User) => (event: React.MouseEvent<HTMLButtonElement>) =>
    props.requestRegistration(requestedUser);

  return (
    <LoginWrapper>
      <LoginHeader>Create an Account</LoginHeader>
      {props.error && !props.result &&
        <Error>{props.error}</Error>
      }
      {props.result && !props.error &&
        <Success>
          {'Registration Success! '}
          <Link to='/login'>Click here to proceed to login.</Link>
        </Success>
      }
      <AccountForm submitText='Create Account' submitFn={registerButton}/>
      <div>
        {'Already have an account? '}
        <Link to='/login'>Click here to log in!</Link>
      </div>
    </LoginWrapper>
  );
};

const mapState = (state: State) => ({ ...state.login.registerRequest });

const mapDispatch = { requestRegistration: REGISTER_REQUEST.PENDING };

export default connect(mapState, mapDispatch)(Register);
