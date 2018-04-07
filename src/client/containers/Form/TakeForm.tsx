import * as React from 'react';
import * as styles from './form.styles.scss';
import { DisplayFormProps } from './Form';
import RenderQuestion from './RenderQuestion';
import { areValidResponses } from 'client/helpers/validation';
import FadeIn from 'client/components/FadeIn';

class TakeForm extends React.Component<DisplayFormProps> {
  componentDidMount() {
    this.props.initResponses(this.props.form.questions.length);
  }

  render() {
    const { form, responses, submitReq, setResponse, submitResponses, resetSubmit } = this.props;

    const responsesWithTypes = responses.map((response, i) => ({
      type: form.questions[i].type,
      value: response
    }));

    return (
      <>
        {submitReq && submitReq.result &&
          <div className={styles.succBanner}>
            Your responses have been submitted
            <i className='material-icons' onClick={resetSubmit}>close</i>
          </div>
        }
        {submitReq && submitReq.error &&
          <div className={styles.errBanner}>
            An Error Has Occurred
            <i className='material-icons' onClick={resetSubmit}>close</i>
          </div>
        }
        <FadeIn>
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
        </FadeIn>
        <div className={styles.footer}>
          <button
            disabled={!areValidResponses(responsesWithTypes)}
            onClick={submitResponses}
          >
            Submit Form
          </button>
        </div>
      </>
    );
  }
}

export default TakeForm;
