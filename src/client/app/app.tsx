import * as React from 'react';
import * as styles from './app.styles.scss';
import { connect } from 'react-redux';
import { State } from 'client/store/rootReducer';
import Link from 'redux-first-router-link';
import Login from './login/login';
import Register from './register/register';

interface Props {
  locationPath: string;
}

const getPage = (path: string) => {
  switch (path) {
    case ('/login'): return <Login/>;
    case ('/register'): return <Register/>;
  }
};

const App = (props: Props) => (
  <div className={styles.test}>
    myForms
    <div><Link to='/login'>Login Link</Link></div>
    <div><Link to='/register'>Register Link</Link></div>
    {getPage(props.locationPath)}
  </div>
);

const mapState = (state: State) => ({
  locationPath: state.location.pathname
});

const mapDispatch = {

};

export default connect(mapState, mapDispatch)(App);
