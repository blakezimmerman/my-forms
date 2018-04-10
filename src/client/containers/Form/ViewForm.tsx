import * as React from 'react';
import { FormType } from 'models/forms';
import { DisplayFormProps } from './Form';
import RenderQuestion from './RenderQuestion';
import FadeIn from 'client/components/FadeIn';
import BasicHeading from 'client/components/BasicHeading';
import PageWrapper from 'client/components/PageWrapper';
import { H2 } from 'client/components/Headers';

export const FormWrapper = PageWrapper.extend`
  padding-bottom: 4.5rem;
  h2 { margin-bottom: 0.5rem; }
`;

class ViewForm extends React.Component<DisplayFormProps> {
  componentDidMount() {
    this.props.initResponses(this.props.form.questions.length);
  }

  render() {
    const { form, responses, setResponse } = this.props;
    return (
      <>
        <BasicHeading>
          This is what your form will look like to others
          {form.type === FormType.Test &&
            ' ...except without the answers shown'
          }.
        </BasicHeading>
        <FadeIn>
          <FormWrapper>
            <H2>{form.name}</H2>
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
          </FormWrapper>
        </FadeIn>
      </>
    );
  }
}

export default ViewForm;
