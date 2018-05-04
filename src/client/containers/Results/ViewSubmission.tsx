import * as React from 'react';
import * as R from 'ramda';
import styled from 'client/styling';
import { connect } from 'react-redux';
import { State } from 'client/store';
import { ActionDispatcher, AsyncReducerState } from 'client/helpers/redux';
import { Form, FormType, QuestionType, Submission } from 'models/forms';
import { GET_FORM_REQUEST } from '../DisplayForm';
import PageWrapper from 'client/components/PageWrapper';
import { Loading } from 'client/components/Loaders';
import Error from 'client/components/Error';
import { H2 } from 'client/components/Headers';
import Card from 'client/components/Card';
import Badge from 'client/components/Badge';
import { match, is } from 'client/helpers/misc';
import RenderAnswer from 'client/components/RenderAnswer';

const QuestionCard = Card.extend`
  margin: 1rem 0;
  padding: 1rem;
`;

const QuestionTop = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

const QuestionNum = styled.div`
  display: inline;
  margin-right: 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
`;

const BadgeWrapper = styled.div`
  display: flex;
`;

interface Props {
  formId: string;
  subId: string;
  formReq: AsyncReducerState<Form>;
  getForm: ActionDispatcher<string>;
}

class ViewSubmission extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.formReq.result || this.props.formReq.result._id !== this.props.formId) {
      this.props.getForm(this.props.formId);
    }
  }

  render() {
    const form = this.props.formReq.result;
    const submission: Submission | undefined = form
      ? R.find(R.propEq('_id', this.props.subId), form.submissions)
      : undefined;

    return (
      <PageWrapper>
        {this.props.formReq.pending && <Loading/>}
        {this.props.formReq.error && <Error>Unable to load form</Error>}
        {form && submission && (
          <>
            <H2>{submission.submittedBy}'s Submission</H2>
            {form.questions.map((question, index) =>
              <QuestionCard key={question._id}>
                <QuestionTop>
                  <div>
                    <QuestionNum>{index + 1}.</QuestionNum>
                    {question.prompt}
                  </div>
                </QuestionTop>
                <BadgeWrapper>
                  {match<QuestionType, JSX.Element>(question.type)
                    .on(is(QuestionType.TrueFalse), (type) => <Badge>True/False Question</Badge>)
                    .on(is(QuestionType.MultipleChoice), (type) => <Badge>Multiple Choice Question</Badge>)
                    .on(is(QuestionType.ShortAnswer), (type) => <Badge>Short Answer Question</Badge>)
                    .on(is(QuestionType.EssayAnswer), (type) => <Badge>Essay Answer Question</Badge>)
                    .on(is(QuestionType.Matching), (type) => <Badge>Matching Question</Badge>)
                    .on(is(QuestionType.Ranking), (type) => <Badge>Ranking Question</Badge>)
                    .otherwise((type) => <Badge>True/False Question</Badge>)
                  }
                </BadgeWrapper>
                <RenderAnswer
                  label={'Response:'}
                  questionType={question.type}
                  answer={submission.responses[index]}
                />
                {form.type === FormType.Test &&
                 !is(QuestionType.ShortAnswer, QuestionType.EssayAnswer)(question.type) &&
                  <RenderAnswer
                    label={'Correct Answer:'}
                    questionType={question.type}
                    answer={(question as any).answer}
                  />
                }
              </QuestionCard>
            )}
          </>
        )}
      </PageWrapper>
    );
  }
}

const mapState = (state: State) => ({
  formReq: state.displayForm.formRequest
});

const mapDispatch = {
  getForm: GET_FORM_REQUEST.PENDING
};

export default connect(mapState, mapDispatch)(ViewSubmission);
