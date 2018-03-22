import * as React from 'react';
import * as styles from './header.styles.scss';
import { connect, Dispatch } from 'react-redux';
import { routeActions } from 'client/router/router';
import { Action } from 'client/shared/reduxUtils';
import { match, is } from 'client/shared/miscUtils';

interface Props {
  locationType: string;
  authenticated: boolean;
  toHome: () => Action<void>;
  toDashboard: () => Action<void>;
  toLogin: () => Action<void>;
}

const Header = (props: Props) => {
  const { locationType, authenticated } = props;

  const toLogout = () => location.href = '/api/auth/logout';

  const button = (label: string, click: () => Action<void> | string) => (
    <button className={styles.headerButton} onClick={click}>{label}</button>
  );

  return (
    <div className={styles.banner}>
      <h1 onClick={props.toHome}>myForms</h1>
      <div>
        {locationType !== 'DASHBOARD' && authenticated &&
          button('Dashboard', props.toDashboard)
        }
        {locationType !== 'LOGIN' && !authenticated &&
          button('Login', props.toLogin)
        }
        {authenticated &&
          button('Logout', toLogout)
        }
      </div>
    </div>
  );
};

const mapDispatch = (dispatch: Dispatch<Action<any>>) => ({
  toHome: () => dispatch(routeActions.HOME()),
  toDashboard: () => dispatch(routeActions.DASHBOARD()),
  toLogin: () => dispatch(routeActions.LOGIN())
});

export default connect(null, mapDispatch)(Header);
