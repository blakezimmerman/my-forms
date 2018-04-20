import * as React from 'react';
import { connect } from 'react-redux';
import { State } from 'client/store';
import { LocationState } from 'redux-first-router';
import { ActionDispatcher } from 'client/helpers/redux';
import { Login, Register, REFRESH_SESSION, getUserName, getAuthenticated } from '../Login';
import Header from '../Header';
import Home from '../Home';
import Dashboard from '../Dashboard';
import CreateForm from '../Create';
import EditForm from '../Edit';
import DisplayForm from '../DisplayForm';

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
        case ('CREATE_SURVEY'): return authenticated && <CreateForm/>;
        case ('CREATE_TEST'): return authenticated && <CreateForm/>;
        case ('EDIT_FORM'): return authenticated && <EditForm/>;
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
