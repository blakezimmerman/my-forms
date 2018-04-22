import * as React from 'react';
import styled, { media } from 'client/styling';
import { connect, Dispatch } from 'react-redux';
import { State } from 'client/store';
import { Form } from 'models/forms';
import { Action, ActionDispatcher, AsyncReducerState} from 'client/helpers/redux';
import { InsertOneWriteOpResult, WriteOpResult } from 'mongodb';
import { getUserName } from '../Login';
import { routeActions } from 'client/router';
import { GET_FORMS_REQUEST, DELETE_FORM_REQUEST } from './reducer';
import { SET_FORM } from '../FormEditor';
import { CREATE_REQUEST } from '../Create';
import { GET_EDIT_FORM_REQUEST, EDIT_REQUEST } from '../Edit';
import { GET_FORM_REQUEST } from '../DisplayForm';
import FadeInOut from 'client/components/FadeInOut';
import Badge from 'client/components/Badge';
import NotificationBanner from 'client/components/NotificationBanner';
import PageWrapper from 'client/components/PageWrapper';
import { H2 } from 'client/components/Headers';
import { Button } from 'client/components/Buttons';
import { Loading } from 'client/components/Loaders';
import Error from 'client/components/Error';
import FormCard from './FormCard';

const SuccessBanner = NotificationBanner.extend`
  background-color: ${({theme}) => theme.colors.success};
  position: sticky;
  top: 4.75rem;
  z-index: 1;

  ${media.mobile`
    top: 3.5rem;
  `}
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SurveyButton = Button.extend`
  background-color: ${({ theme}) => theme.colors.primaryLight};
  width: 50%;
  margin: 0 0 0.7rem 1rem;
  padding: 0.8rem 1.2rem;
  border-radius: 4px 0 0 4px;
`;

const TestButton = SurveyButton.extend`
  background-color: ${({ theme}) => theme.colors.primaryDark};
  margin: 0 1rem 0.7rem 0;
  border-radius: 0 4px 4px 0;
`;

interface Props {
  userName: string;
  formsReq: AsyncReducerState<Form[]>;
  createReq: AsyncReducerState<InsertOneWriteOpResult>;
  editReq: AsyncReducerState<WriteOpResult>;
  toCreateSurvey: () => Action<void>;
  toCreateTest: () => Action<void>;
  requestForms: ActionDispatcher<void>;
  createReset: (event: React.MouseEvent<HTMLElement>) => Action<void>;
  editReset: (event: React.MouseEvent<HTMLElement>) => Action<void>;
  displayForm: (form: Form) => () => void;
  editForm: (form: Form) => () => void;
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
          <SuccessBanner>
            Form Created Successfully
            <i className='material-icons' onClick={this.props.createReset}>close</i>
          </SuccessBanner>
        }
        {this.props.editReq.result &&
          <SuccessBanner>
            Form Edited Successfully
            <i className='material-icons' onClick={this.props.editReset}>close</i>
          </SuccessBanner>
        }
        <PageWrapper>
          <H2>Welcome, {this.props.userName}</H2>
          <ButtonsWrapper>
            <SurveyButton onClick={this.props.toCreateSurvey}>
              Create Survey
            </SurveyButton>
            <TestButton onClick={this.props.toCreateTest}>
              Create Test
            </TestButton>
          </ButtonsWrapper>
          <H2>Your Forms</H2>
          {this.props.formsReq.error && <Error>An Error has Occurred</Error>}
          {this.props.formsReq.pending && <Loading/>}
          <FadeInOut>
            {this.props.formsReq.result &&
              this.props.formsReq.result.map((form) =>
                <FormCard
                  key={form._id}
                  form={form}
                  displayForm={this.props.displayForm}
                  editForm={this.props.editForm}
                  deleteForm={this.props.deleteForm}
                />
              )
            }
          </FadeInOut>
        </PageWrapper>
      </>
    );
  }
}

const mapState = (state: State) => ({
  userName: getUserName(state),
  formsReq: state.dashboard.formsRequest,
  createReq: state.create,
  editReq: state.edit.editRequest
});

const mapDispatch = (dispatch: Dispatch<Action<any>>) => ({
  toCreateSurvey: () => dispatch(routeActions.CREATE_SURVEY()),
  toCreateTest: () => dispatch(routeActions.CREATE_TEST()),
  requestForms: () => dispatch(GET_FORMS_REQUEST.PENDING()),
  createReset: (event: React.MouseEvent<HTMLElement>) => dispatch(CREATE_REQUEST.RESET()),
  editReset: (event: React.MouseEvent<HTMLElement>) => dispatch(EDIT_REQUEST.RESET()),
  displayForm: (form: Form) => () => {
    dispatch(GET_FORM_REQUEST.SUCCESS(form));
    dispatch(routeActions.DISPLAY_FORM({id: form._id}));
  },
  editForm: (form: Form) => () => {
    dispatch(GET_EDIT_FORM_REQUEST.RESET());
    dispatch(SET_FORM(form));
    dispatch(routeActions.EDIT_FORM({id: form._id}));
  },
  deleteForm: (id: string) => () => dispatch(DELETE_FORM_REQUEST.PENDING(id))
});

export default connect(mapState, mapDispatch)(Dashboard);
