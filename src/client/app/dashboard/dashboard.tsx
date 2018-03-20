import * as React from 'react';
import * as styles from './dashboard.styles.scss';
import { connect, Dispatch } from 'react-redux';
import { State } from 'client/store/rootReducer';
import { Form } from 'models/forms';
import { Action, ActionDispatcher, AsyncReducerState} from 'client/shared/reduxUtils';
import { InsertOneWriteOpResult } from 'mongodb';
import { getUserName } from '../login/login.selectors';
import { routeActions } from 'client/router/router';
import { GET_FORMS_REQUEST } from './dashboard.reducer';
import { CREATE_REQUEST } from '../create/create.reducer';

interface Props {
  userName: string;
  formsReq: AsyncReducerState<Form[]>;
  createReq: AsyncReducerState<InsertOneWriteOpResult>;
  toCreateSurvey: () => Action<void>;
  toCreateTest: () => Action<void>;
  requestForms: ActionDispatcher<void>;
  createReset: (event: React.MouseEvent<HTMLElement>) => Action<void>;
}

class Dashboard extends React.Component<Props> {
  componentDidMount() {
    this.props.requestForms();
  }

  render() {
    return (
      <>
        {this.props.createReq.result &&
          <div className={styles.successBanner}>
            Form Created Successfully
            <i className='material-icons' onClick={this.props.createReset}>close</i>
          </div>
        }
        <div className={styles.container}>
          <h2>Welcome, {this.props.userName}</h2>
          <div>
            <button className={styles.createButton} onClick={this.props.toCreateSurvey}>
              Create Survey
            </button>
            <button className={styles.createButton} onClick={this.props.toCreateTest}>
              Create Test
            </button>
          </div>
          <h2>Your Forms</h2>
        </div>
      </>
    );
  }
}

const mapState = (state: State) => ({
  userName: getUserName(state),
  formsReq: state.dashboard.formsRequest,
  createReq: state.create.createRequest
});

const mapDispatch = (dispatch: Dispatch<Action<any>>) => ({
  toCreateSurvey: () => dispatch(routeActions.CREATE_SURVEY()),
  toCreateTest: () => dispatch(routeActions.CREATE_TEST()),
  requestForms: () => dispatch(GET_FORMS_REQUEST.PENDING()),
  createReset: (event: React.MouseEvent<HTMLElement>) => dispatch(CREATE_REQUEST.RESET())
});

export default connect(mapState, mapDispatch)(Dashboard);
