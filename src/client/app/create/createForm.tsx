import * as React from 'react';
import * as styles from './create.styles.scss';
import * as R from 'ramda';
import * as shortId from 'shortid';
import { FormType, QuestionType, Question } from 'models/forms';
import QuestionFactory from './questions/questionFactory';

interface Props {
  type: FormType;
}

interface LocalState {
  select: QuestionType;
  questions: Question[];
}

class CreateForm extends React.Component<Props, LocalState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      select: QuestionType.TrueFalse,
      questions: []
    };
  }

  handleSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({select: event.currentTarget.value as QuestionType});
  }

  createQuestion = () => {
    this.setState((prevState) => ({
      questions: [
        ...prevState.questions,
        {
          _id: shortId.generate(),
          prompt: '',
          type: prevState.select
        }
      ]
    }));
  }

  updateQuestion = (i: number, q: Question) => {
    this.setState((prevState) => ({
      questions: R.update(i, q, prevState.questions)
    }));
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
          Create {this.props.type}
          {this.state.questions.map((question, index) =>
            <QuestionFactory key={question._id} question={question} index={index}/>
          )}
        </div>
      </>
    );
  }
}

export default CreateForm;
