import * as React from 'react';
import * as styles from './form.styles.scss';
import { FormType } from 'models/forms';
import { DisplayFormProps } from './form';
import RenderQuestion from './renderQuestion';
import FadeIn from 'client/shared/UI/transitions/fadeIn';

class ViewForm extends React.Component<DisplayFormProps> {
  componentDidMount() {
    this.props.initResponses(this.props.form.questions.length);
  }

  render() {
    const { form, responses, setResponse } = this.props;
    return (
      <>
        <div className={styles.header}>
          This is what your form will look like to others
          {form.type === FormType.Test &&
            ' ...except without the answers shown'
          }.
        </div>
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
                showAnswer={true}
              />
            )}
          </div>
        </FadeIn>
      </>
    );
  }
}

export default ViewForm;
