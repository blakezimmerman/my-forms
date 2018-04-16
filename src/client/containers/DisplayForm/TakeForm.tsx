import * as React from 'react';
import { DisplayFormProps } from './DisplayForm';
import RenderQuestion from './RenderQuestion';
import { areValidResponses } from 'client/helpers/validation';
import FadeIn from 'client/components/FadeIn';
import { FormWrapper } from './ViewForm';
import { H2 } from 'client/components/Headers';
import BasicFooter from 'client/components/BasicFooter';
import { Button } from 'client/components/Buttons';
import NotificationBanner from 'client/components/NotificationBanner';

const SuccessBanner = NotificationBanner.extend`
  background-color: ${({theme}) => theme.colors.success};
  position: sticky;
  top: 4.75rem;
  z-index: 1;
`;

const ErrorBanner = SuccessBanner.extend`
  background-color: ${({theme}) => theme.colors.failure};
`;

const FooterButton = Button.extend`
  color: ${({theme}) => theme.colors.primary}
  background-color: white;
`;

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
          <SuccessBanner>
            Your responses have been submitted
            <i className='material-icons' onClick={resetSubmit}>close</i>
          </SuccessBanner>
        }
        {submitReq && submitReq.error &&
          <ErrorBanner>
            An Error Has Occurred
            <i className='material-icons' onClick={resetSubmit}>close</i>
          </ErrorBanner>
        }
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
                showAnswer={false}
              />
            )}
          </FormWrapper>
        </FadeIn>
        <BasicFooter>
          <FooterButton
            disabled={!areValidResponses(responsesWithTypes)}
            onClick={submitResponses}
          >
            Submit Form
          </FooterButton>
        </BasicFooter>
      </>
    );
  }
}

export default TakeForm;
