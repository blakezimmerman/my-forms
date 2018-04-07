import * as React from 'react';
import * as styles from './create.styles.scss';
import { connect } from 'react-redux';
import { State } from 'client/store';
import { ActionDispatcher, AsyncReducerState} from 'client/helpers/redux';
import { InsertOneWriteOpResult } from 'mongodb';
import { Form, FormType, QuestionType, Question, NewForm } from 'models/forms';
import { UPDATE_NAME, TOGGLE_PUBLISH, ADD_QUESTION, CREATE_REQUEST } from './reducer';
import { isValidNewForm } from 'client/helpers/validation';
import { animateScroll } from 'react-scroll';
import FadeIn from 'client/components/FadeIn';
import CreateQuestion from './questions/CreateQuestion';
import Toggle from 'client/components/Toggle';

interface Props {
  type: FormType;
  form: NewForm;
  createReq: AsyncReducerState<InsertOneWriteOpResult>;
  UPDATE_NAME: ActionDispatcher<string>;
  TOGGLE_PUBLISH: ActionDispatcher<void>;
  ADD_QUESTION: ActionDispatcher<QuestionType>;
  CREATE_REQUEST_PENDING: ActionDispatcher<NewForm>;
  CREATE_REQUEST_RESET: ActionDispatcher<void>;
}

interface LocalState {
  select: QuestionType;
}

class CreateForm extends React.Component<Props, LocalState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      select: QuestionType.TrueFalse
    };
  }

  handleSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({select: event.currentTarget.value as QuestionType});
  }

  handleName = (event: React.FormEvent<HTMLInputElement>) => this.props.UPDATE_NAME(event.currentTarget.value);

  togglePublish = (event: React.SyntheticEvent<HTMLInputElement>) => this.props.TOGGLE_PUBLISH();

  createQuestion = () => {
    this.props.ADD_QUESTION(this.state.select);
    animateScroll.scrollToBottom();
  }

  submitForm = () => this.props.CREATE_REQUEST_PENDING(this.props.form);

  createRequestReset = (event: React.MouseEvent<HTMLElement>) => {
    this.props.CREATE_REQUEST_RESET();
  }

  render() {
    return (
      <>
        <div className={styles.header}>
          <select
            className={styles.select}
            value={this.state.select}
            onChange={this.handleSelect}
          >
            {Object.values(QuestionType).map((question: string) =>
              <option key={question} value={question}>{question}</option>
            )}
          </select>
          <button
            className={styles.headerButton}
            onClick={this.createQuestion}
          >
            Create
          </button>
        </div>
        <div className={styles.container}>
          <input
            className={styles.nameInput}
            type='text'
            value={this.props.form.name}
            onChange={this.handleName}
            placeholder={`Enter ${this.props.type} Name...`}
          />
          {this.props.form.questions.map((question, index) =>
            <FadeIn key={question._id}>
              <CreateQuestion type={this.props.type} question={question} index={index}/>
            </FadeIn>
          )}
        </div>
        {this.props.createReq.error &&
          <div className={styles.errorBanner}>
            An Error Has Occurred
            <i className='material-icons' onClick={this.createRequestReset}>close</i>
          </div>
        }
        <div className={styles.footer}>
          <label className={styles.toggleLabel}>
            <p>Publish?</p>
            <Toggle
              value={this.props.form.published}
              onChange={this.togglePublish}
              primary={false}
            />
          </label>
          <button
            onClick={this.submitForm}
            disabled={!isValidNewForm(this.props.form)}
          >
            Create Form
          </button>
        </div>
      </>
    );
  }
}

const mapState = (state: State) => ({
  form: state.create.form,
  createReq: state.create.createRequest
});

const mapDispatch = {
  UPDATE_NAME,
  TOGGLE_PUBLISH,
  ADD_QUESTION,
  CREATE_REQUEST_PENDING: CREATE_REQUEST.PENDING,
  CREATE_REQUEST_RESET: CREATE_REQUEST.RESET
};

export default connect(mapState, mapDispatch)(CreateForm);
