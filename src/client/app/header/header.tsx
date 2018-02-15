import * as React from 'react';
import * as styles from './header.styles.scss';
import { connect } from 'react-redux';
import { routeActions } from 'client/router/router';
import { Action, ActionDispatcher } from 'client/shared/reduxUtils';
import { match, is } from 'client/shared/miscUtils';

interface Props {
  locationPath: string;
  authenticated: boolean;
  dashboardRoute: ActionDispatcher<void>;
  homeRoute: ActionDispatcher<void>;
  loginRoute: ActionDispatcher<void>;
}

const Header = (props: Props) => {
  const toDashboard = () => props.dashboardRoute();
  const toHome = () => props.homeRoute();
  const toLogin = () => props.loginRoute();
  const toLogout = () => location.href = '/api/auth/logout';

  const { locationPath, authenticated } = props;

  const button = (label: string, click: () => Action<void> | string) => (
    <button className={styles.headerButton} onClick={click}>{label}</button>
  );

  return (
    <div className={styles.banner}>
      <h1 onClick={toHome}>myForms</h1>
      <div>
        {locationPath !== '/dashboard' && authenticated &&
          button('Dashboard', toDashboard)
        }
        {locationPath !== '/login' && !authenticated &&
          button('Login', toLogin)
        }
        {authenticated &&
          button('Logout', toLogout)
        }
      </div>
    </div>
  );
};

const mapDispatch = {
  dashboardRoute: routeActions.DASHBOARD,
  homeRoute: routeActions.HOME,
  loginRoute: routeActions.LOGIN
};

export default connect(null, mapDispatch)(Header);
