import * as React from 'react';
import styled, { media } from 'client/styling';
import { connect, Dispatch } from 'react-redux';
import { routeActions } from 'client/router';
import { Action } from 'client/helpers/redux';
import { match, is } from 'client/helpers/misc';
import { H1 } from 'client/components/Headers';
import { ClearButton } from 'client/components/Buttons';

interface Props {
  locationType: string;
  authenticated: boolean;
  toHome: () => Action<void>;
  toDashboard: () => Action<void>;
  toLogin: () => Action<void>;
}

const Banner = styled.div`
  color: white;
  background-color: ${({theme}) => theme.colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;

  ${media.mobile`
    padding: 0.6rem;
  `}
`;

const HeaderText = H1.extend`
  margin: 0;
  cursor: pointer;

  ${media.mobile`
    font-size: 1.7rem;
  `}
`;

const HeaderButton = ClearButton.extend`
  margin: 0 0.5rem;

  ${media.mobile`
    margin: 0 0.2rem;
  `}
`;

const Header = (props: Props) => {
  const { locationType, authenticated } = props;

  const toLogout = () => location.href = '/api/auth/logout';

  return (
    <Banner>
      <HeaderText onClick={props.toHome}>myForms</HeaderText>
      <div>
        {locationType !== 'DASHBOARD' && authenticated &&
          <HeaderButton onClick={props.toDashboard}>Dashboard</HeaderButton>
        }
        {locationType !== 'LOGIN' && !authenticated &&
          <HeaderButton onClick={props.toLogin}>Login</HeaderButton>
        }
        {authenticated &&
          <HeaderButton onClick={toLogout}>Logout</HeaderButton>
        }
      </div>
    </Banner>
  );
};

const mapDispatch = (dispatch: Dispatch<Action<any>>) => ({
  toHome: () => dispatch(routeActions.HOME()),
  toDashboard: () => dispatch(routeActions.DASHBOARD()),
  toLogin: () => dispatch(routeActions.LOGIN())
});

export default connect(null, mapDispatch)(Header);
