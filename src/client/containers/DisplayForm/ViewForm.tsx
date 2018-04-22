import * as React from 'react';
import styled from 'client/styling';
import { FormType } from 'models/forms';
import { DisplayFormProps } from './DisplayForm';
import RenderQuestion from './RenderQuestion';
import FadeInOut from 'client/components/FadeInOut';
import BasicHeading from 'client/components/BasicHeading';
import PageWrapper from 'client/components/PageWrapper';
import { H2 } from 'client/components/Headers';
import CopyButton from 'client/components/CopyButton';

export const FormWrapper = PageWrapper.extend`
  padding-bottom: 4.5rem;
  h2 { margin-bottom: 0.5rem; }
`;

export const CopyButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0.5rem 0 0;
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
          <CopyButtonWrapper>
            <CopyButton
              text={`${window.location.origin}/forms/${this.props.form._id}`}
            />
          </CopyButtonWrapper>
        </BasicHeading>
        <FadeInOut>
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
        </FadeInOut>
      </>
    );
  }
}

export default ViewForm;
