import * as React from 'react';
import styled from 'client/styling';
import { connect } from 'react-redux';
import { State } from 'client/store';
import { ActionDispatcher } from 'client/helpers/redux';
import { User } from 'models/users';
import { LOGIN_REQUEST } from './reducer';
import { InsertOneWriteOpResult } from 'mongodb';
import Link from 'redux-first-router-link';
import PageWrapper from 'client/components/PageWrapper';
import AccountForm from './AccountForm';
import { H2 } from 'client/components/Headers';

export const LoginWrapper = PageWrapper.extend`
  align-items: center;
`;

export const LoginHeader = H2.extend`
  text-align: center;
`;

interface Props {
  pending: boolean;
  result: string;
  error: string;
  requestLogin: ActionDispatcher<User>;
}

export const Error = styled.h3`
  color: ${({theme}) => theme.colors.failure};
  margin-top: 0;
  font-size: 1.3rem;
  text-align: center;
`;

const Login = (props: Props) => {
  const loginButton = (requestedUser: User) => (event: React.MouseEvent<HTMLButtonElement>) =>
    props.requestLogin(requestedUser);

  return (
    <LoginWrapper>
      <LoginHeader>Sign in</LoginHeader>
      {props.error && <Error>{props.error}</Error>}
      <AccountForm submitText='Log In' submitFn={loginButton}/>
      <div>
        {'Not Registered? '}
        <Link to='/register'>Click here to make an account!</Link>
      </div>
    </LoginWrapper>
  );
};

const mapState = (state: State) => ({ ...state.login.loginRequest });

const mapDispatch = { requestLogin: LOGIN_REQUEST.PENDING };

export default connect(mapState, mapDispatch)(Login);
