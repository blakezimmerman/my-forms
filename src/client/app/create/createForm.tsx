import * as React from 'react';
import * as styles from './create.styles.scss';
import { connect } from 'react-redux';
import { State } from 'client/store/rootReducer';
import { ActionDispatcher } from 'client/shared/reduxUtils';
import { Form, FormType, QuestionType, Question, NewForm } from 'models/forms';
import { UPDATE_NAME, TOGGLE_PUBLISH, ADD_QUESTION } from './create.reducer';
import { isValidNewForm } from 'client/shared/formValidation';
import { animateScroll } from 'react-scroll';
import FadeIn from 'client/shared/UI/transitions/fadeIn';
import CreateQuestion from './questions/question';
import Toggle from 'client/shared/UI/components/toggle';

interface Props {
  type: FormType;
  form: NewForm;
  UPDATE_NAME: ActionDispatcher<string>;
  TOGGLE_PUBLISH: ActionDispatcher<void>;
  ADD_QUESTION: ActionDispatcher<QuestionType>;
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

  submitForm = () => { /*TODO*/ };

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
            onChange={this.submitForm}
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
  form: state.create.form
});

const mapDispatch = {
  UPDATE_NAME,
  TOGGLE_PUBLISH,
  ADD_QUESTION
};

export default connect(mapState, mapDispatch)(CreateForm);
