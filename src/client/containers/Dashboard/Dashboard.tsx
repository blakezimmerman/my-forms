import * as React from 'react';
import styled, { media, withTheme, Theme } from 'client/styling';
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
import Badge from 'client/components/Badge';
import NotificationBanner from 'client/components/NotificationBanner';
import PageWrapper from 'client/components/PageWrapper';
import { H2 } from 'client/components/Headers';
import { Button, InvertedButton } from 'client/components/Buttons';
import Card from 'client/components/Card';
import Loading from 'client/components/Loading';
import Error from 'client/components/Error';

const SuccessBanner = NotificationBanner.extend`
  background-color: ${({theme}) => theme.colors.success};
  position: -webkit-sticky;
  position: sticky;
  top: 4.75rem;
  z-index: 1;

  ${media.mobile`
    top: 3.5rem;
  `}
`;

const ButtonsWrapper = styled.div`
  button { margin: 0.5rem; }
`;

const FormCard = Card.extend`
  margin: 1rem;
  padding: 1rem;
`;

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormName = styled.div`
  font-size: 1.2rem;
`;

const SecondRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ActionButton = InvertedButton.extend`
  display: inline-block;
  margin: 0.6rem 1rem 0;
  font-size: 1rem;
  padding: 0.25rem 0.6rem;
`;

interface Props {
  theme: Theme;
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
          <SuccessBanner>
            Form Created Successfully
            <i className='material-icons' onClick={this.props.createReset}>close</i>
          </SuccessBanner>
        }
        <PageWrapper>
          <H2>Welcome, {this.props.userName}</H2>
          <ButtonsWrapper>
            <Button onClick={this.props.toCreateSurvey}>
              Create Survey
            </Button>
            <Button onClick={this.props.toCreateTest}>
              Create Test
            </Button>
          </ButtonsWrapper>
          <H2>Your Forms</H2>
          {this.props.formsReq.error && <Error>An Error has Occurred</Error>}
          <DelayRender>
            <>{this.props.formsReq.pending && <Loading/>}</>
          </DelayRender>
          <FadeIn>
            {this.props.formsReq.result &&
              this.props.formsReq.result.map((form) =>
                <FormCard key={form._id}>
                  <FirstRow>
                    <FormName>{form.name}</FormName>
                    {form.published
                      ? <Badge color={this.props.theme.colors.primary}>Published {form.type}</Badge>
                      : <Badge color={this.props.theme.colors.failure}>Unpublished {form.type}</Badge>
                    }
                  </FirstRow>
                  <SecondRow>
                    <ActionButton onClick={this.props.displayForm(form._id)}>View</ActionButton>
                    <ActionButton>Edit</ActionButton>
                    <ActionButton onClick={this.props.deleteForm(form._id)}>Delete</ActionButton>
                  </SecondRow>
                </FormCard>
              )
            }
          </FadeIn>
        </PageWrapper>
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

export default withTheme(connect(mapState, mapDispatch)(Dashboard));
