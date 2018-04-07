import * as React from 'react';
import * as styles from './dashboard.styles.scss';
import { connect, Dispatch } from 'react-redux';
import { State } from 'client/store';
import { Form } from 'models/forms';
import { Action, ActionDispatcher, AsyncReducerState} from 'client/helpers/redux';
import { InsertOneWriteOpResult } from 'mongodb';
import { getUserName } from '../Login';
import { routeActions } from 'client/router';
import { GET_FORMS_REQUEST, DELETE_FORM_REQUEST } from './reducer';
import { CREATE_REQUEST } from '../Create';
import FadeIn from 'client/components/FadeIn';
import DelayRender from 'client/components/DelayRender';

interface Props {
  userName: string;
  formsReq: AsyncReducerState<Form[]>;
  createReq: AsyncReducerState<InsertOneWriteOpResult>;
  toCreateSurvey: () => Action<void>;
  toCreateTest: () => Action<void>;
  requestForms: ActionDispatcher<void>;
  createReset: (event: React.MouseEvent<HTMLElement>) => Action<void>;
  displayForm: (id: string) => () => Action<{id: string}>;
  deleteForm: (id: string) => () => Action<string>;
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
          {this.props.formsReq.error &&
            <div className={styles.error}>An Error has Occurred</div>
          }
          <DelayRender>
            <>
            {this.props.formsReq.pending &&
              <div className={styles.loader}>Loading...</div>
            }
            </>
          </DelayRender>
          <FadeIn>
            {this.props.formsReq.result &&
              this.props.formsReq.result.map((form) =>
                <div key={form._id} className={styles.formCard}>
                  <div className={styles.firstRow}>
                    <div className={styles.formName}>{form.name}</div>
                    {form.published
                      ? <div className={styles.publishedBadge}>Published {form.type}</div>
                      : <div className={styles.unpublishedBadge}>Unpublished {form.type}</div>
                    }
                  </div>
                  <div className={styles.secondRow}>
                    <button onClick={this.props.displayForm(form._id)}>View</button>
                    <button>Edit</button>
                    <button onClick={this.props.deleteForm(form._id)}>Delete</button>
                  </div>
                </div>
              )
            }
          </FadeIn>
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
  createReset: (event: React.MouseEvent<HTMLElement>) => dispatch(CREATE_REQUEST.RESET()),
  displayForm: (id: string) => () => dispatch(routeActions.DISPLAY_FORM({id})),
  deleteForm: (id: string) => () => dispatch(DELETE_FORM_REQUEST.PENDING(id))
});

export default connect(mapState, mapDispatch)(Dashboard);
