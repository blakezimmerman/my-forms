import * as React from 'react';
import * as styles from './form.styles.scss';
import { DisplayFormProps } from './form';
import RenderQuestion from './renderQuestion';

class TakeForm extends React.Component<DisplayFormProps> {
  componentDidMount() {
    this.props.initResponses(this.props.form.questions.length);
  }

  render() {
    const { form, responses, setResponse } = this.props;
    return (
      <>
        <div className={styles.container}>
          <h2>{form.name}</h2>
          {form.questions.map((question, i) =>
            <RenderQuestion
              key={question._id}
              index={i}
              question={question}
              response={responses[i]}
              setResponse={setResponse(i)}
              showAnswer={false}
            />
          )}
        </div>
        <div className={styles.footer}>
          <button>
            Submit Form
          </button>
        </div>
      </>
    );
  }
}

export default TakeForm;
