import * as React from 'react';
import './app.styles.scss';
import { connect } from 'react-redux';
import { State } from 'client/store/rootReducer';
import { LocationState } from 'redux-first-router';
import { ActionDispatcher } from 'client/shared/reduxUtils';
import { REFRESH_SESSION } from './login/login.reducer';
import { getUserName, getAuthenticated } from './login/login.selectors';
import { FormType } from 'models/forms';
import Header from './header/header';
import Home from './home/home';
import Login from './login/login';
import Register from './login/register';
import Dashboard from './dashboard/dashboard';
import CreateForm from './create/createForm';
import DisplayForm from './form/form';

interface Props {
  location: LocationState;
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
    const { location, authenticated } = this.props;

    const getPage = () => {
      switch (location.type) {
        case ('HOME'): return <Home/>;
        case ('LOGIN'): return <Login/>;
        case ('REGISTER'): return <Register/>;
        case ('DASHBOARD'): return authenticated && <Dashboard/>;
        case ('CREATE_SURVEY'): return authenticated && <CreateForm type={FormType.Survey}/>;
        case ('CREATE_TEST'): return authenticated && <CreateForm type={FormType.Test}/>;
        case ('DISPLAY_FORM'): return <DisplayForm id={(location as any).payload.id}/>;
        default: return <Home/>;
      }
    };

    return (
      <>
        <Header
          locationType={location.type}
          authenticated={authenticated}
        />
        {getPage()}
      </>
    );
  }
}

const mapState = (state: State) => ({
  location: state.location,
  authenticated: getAuthenticated(state)
});

const mapDispatch = { refreshSession: REFRESH_SESSION };

export default connect(mapState, mapDispatch)(App);
