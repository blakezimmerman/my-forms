import * as React from 'react';
import * as styles from './create.styles.scss';
import { connect } from 'react-redux';
import { State } from 'client/store/rootReducer';
import { ActionDispatcher } from 'client/shared/reduxUtils';
import { Form, FormType, QuestionType, Question } from 'models/forms';
import { UPDATE_NAME, ADD_QUESTION } from './create.reducer';
import { animateScroll } from 'react-scroll';
import FadeIn from 'client/shared/UI/transitions/fadeIn';
import CreateQuestion from './questions/question';

interface Props {
  type: FormType;
  form: Form;
  UPDATE_NAME: ActionDispatcher<string>;
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

  createQuestion = () => {
    this.props.ADD_QUESTION(this.state.select);
    animateScroll.scrollToBottom();
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
      </>
    );
  }
}

const mapState = (state: State) => ({
  form: state.create.form
});

const mapDispatch = {
  UPDATE_NAME,
  ADD_QUESTION
};

export default connect(mapState, mapDispatch)(CreateForm);
