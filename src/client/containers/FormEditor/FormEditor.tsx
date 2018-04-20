import * as React from 'react';
import styled, { media } from 'client/styling';
import { connect } from 'react-redux';
import { State } from 'client/store';
import { ActionDispatcher, AsyncReducerState} from 'client/helpers/redux';
import { NewForm, QuestionType } from 'models/forms';
import { UPDATE_NAME, TOGGLE_PUBLISH, ADD_QUESTION } from './reducer';
import { isValidNewForm } from 'client/helpers/validation';
import { animateScroll } from 'react-scroll';
import FadeIn from 'client/components/FadeIn';
import QuestionEditor from './QuestionEditor';
import Toggle from 'client/components/Toggle';
import PageWrapper from 'client/components/PageWrapper';
import BasicHeading from 'client/components/BasicHeading';
import BasicFooter from 'client/components/BasicFooter';
import NotificationBanner from 'client/components/NotificationBanner';
import { Button } from 'client/components/Buttons';
import Select from 'client/components/Select';
import { Input } from 'client/components/Inputs';

const EditorWrapper = PageWrapper.extend`
  margin-bottom: 4.25rem;

  ${media.mobile`
    margin-bottom: 3.5rem;
  `}
`;

const HeaderButton = Button.extend`
  margin: 0 0.4rem;
`;

const NameInput = Input.extend`
  font-size: 1.3rem;
  margin: 1rem 0;
  padding: 0.5rem;
`;

const ErrorBanner = NotificationBanner.extend`
  background-color: ${({theme}) => theme.colors.failure};
  position: fixed;
  bottom: 4.15rem;
  width: calc(100% - 3.2rem);

  ${media.mobile`
    bottom: 3.5rem;
    padding: 0.6rem 1.2rem;
    width: calc(100% - 2.4rem);
  `}
`;

const Footer = BasicFooter.extend`
  justify-content: space-between;
`;

const ToggleWrapper = styled.label`
  display: flex;
  align-items: center;
  color: white;
`;

const ToggleLabel = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0.5rem 0 0;
`;

const FooterButton = Button.extend`
  color: ${({theme}) => theme.colors.primary};
  background-color: white;
`;

interface Props {
  form: NewForm;
  submitText: string;
  submitReq: AsyncReducerState<any>;
  UPDATE_NAME: ActionDispatcher<string>;
  TOGGLE_PUBLISH: ActionDispatcher<void>;
  ADD_QUESTION: ActionDispatcher<QuestionType>;
  SUBMIT_REQUEST_PENDING: ActionDispatcher<NewForm>;
  SUBMIT_REQUEST_RESET: ActionDispatcher<void>;
}

interface LocalState {
  select: QuestionType;
}

class FormEditor extends React.Component<Props, LocalState> {
  state = {
    select: QuestionType.TrueFalse
  };

  handleSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({select: event.currentTarget.value as QuestionType});
  }

  handleName = (event: React.FormEvent<HTMLInputElement>) => this.props.UPDATE_NAME(event.currentTarget.value);

  togglePublish = (event: React.SyntheticEvent<HTMLInputElement>) => this.props.TOGGLE_PUBLISH();

  createQuestion = () => {
    this.props.ADD_QUESTION(this.state.select);
    animateScroll.scrollToBottom();
  }

  submitForm = () => this.props.SUBMIT_REQUEST_PENDING(this.props.form);

  createRequestReset = (event: React.MouseEvent<HTMLElement>) => {
    this.props.SUBMIT_REQUEST_RESET();
  }

  render() {
    return (
      <>
        <BasicHeading>
          <Select
            value={this.state.select}
            onChange={this.handleSelect}
          >
            {Object.values(QuestionType).map((question: string) =>
              <option key={question} value={question}>{question}</option>
            )}
          </Select>
          <HeaderButton onClick={this.createQuestion}>Create</HeaderButton>
        </BasicHeading>
        <EditorWrapper>
          <NameInput
            type='text'
            value={this.props.form.name}
            onChange={this.handleName}
            placeholder={`Enter ${this.props.form.type} Name...`}
          />
          {this.props.form.questions.map((question, index) =>
            <FadeIn key={question._id}>
              <QuestionEditor type={this.props.form.type} question={question} index={index}/>
            </FadeIn>
          )}
        </EditorWrapper>
        {this.props.submitReq.error &&
          <ErrorBanner>
            An Error Has Occurred
            <i className='material-icons' onClick={this.createRequestReset}>close</i>
          </ErrorBanner>
        }
        <Footer>
          <ToggleWrapper>
            <ToggleLabel>Publish?</ToggleLabel>
            <Toggle
              value={this.props.form.published}
              onChange={this.togglePublish}
              primary={false}
            />
          </ToggleWrapper>
          <FooterButton
            onClick={this.submitForm}
            disabled={!isValidNewForm(this.props.form)}
          >
            {this.props.submitText}
          </FooterButton>
        </Footer>
      </>
    );
  }
}

const mapState = (state: State) => ({
  form: state.formEditor
});

const mapDispatch = {
  UPDATE_NAME,
  TOGGLE_PUBLISH,
  ADD_QUESTION
};

export default connect(mapState, mapDispatch)(FormEditor);
