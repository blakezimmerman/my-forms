import * as React from 'react';
import './app.styles.scss';
import { connect } from 'react-redux';
import { State } from 'client/store/rootReducer';
import { ActionDispatcher } from 'client/shared/reduxUtils';
import { REFRESH_SESSION } from './login/login.reducer';
import { getUserName, getAuthenticated } from './login/login.selectors';
import Header from './header/header';
import Home from './home/home';
import Login from './login/login';
import Register from './login/register';
import Dashboard from './dashboard/dashboard';

interface Props {
  locationPath: string;
  authenticated: boolean;
  refreshSession: ActionDispatcher<void>;
}

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.authenticated) {
      return this.props.refreshSession();
    }
  }

  render() {
    const { locationPath, authenticated } = this.props;

    const getPage = () => {
      switch (locationPath) {
        case ('/'): return <Home/>;
        case ('/login'): return <Login/>;
        case ('/register'): return <Register/>;
        case ('/dashboard'): return authenticated && <Dashboard/>;
      }
    };

    return (
      <>
        <Header
          locationPath={locationPath}
          authenticated={authenticated}
        />
        {getPage()}
      </>
    );
  }
}

const mapState = (state: State) => ({
  locationPath: state.location.pathname,
  authenticated: getAuthenticated(state)
});

const mapDispatch = { refreshSession: REFRESH_SESSION };

export default connect(mapState, mapDispatch)(App);
