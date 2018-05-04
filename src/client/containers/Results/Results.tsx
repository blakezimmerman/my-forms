import * as React from 'react';
import styled from 'client/styling';
import { connect, Dispatch } from 'react-redux';
import { State } from 'client/store';
import { Action, ActionDispatcher, AsyncReducerState } from 'client/helpers/redux';
import { Form, FormType } from 'models/forms';
import { GET_FORM_REQUEST } from '../DisplayForm';
import { getSubmissionsGraded, getAverageGrade } from './selectors';
import { formatDate } from './helpers';
import { Loading } from 'client/components/Loaders';
import Error from 'client/components/Error';
import { H2, H3 } from 'client/components/Headers';
import PageWrapper from 'client/components/PageWrapper';
import SubmissionCard from './SubmissionCard';
import { routeActions } from 'client/router';

const ResultsDetail = styled.div`
  margin: 0.3rem 0.5rem;
  font-size: 1.1rem;
`;

const Value = styled.span`
  color: ${({theme}) => theme.colors.primary};
`;

interface Props {
  id: string;
  formReq: AsyncReducerState<Form>;
  submissionsGraded: number | undefined;
  averageGrade: number | undefined;
  getForm: ActionDispatcher<string>;
  toSubmission: (formId: string, subId: string) => () => Action<{ formId: string, subId: string }>;
}

class Results extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.formReq.result || this.props.formReq.result._id !== this.props.id) {
      this.props.getForm(this.props.id);
    }
  }

  render() {
    const form = this.props.formReq.result;
    const submissions = form ? form.submissions : undefined;
    return (
      <PageWrapper>
        {this.props.formReq.pending && <Loading/>}
        {this.props.formReq.error && <Error>Unable to load form</Error>}
        {form && submissions && (
          <>
            <H2>{form.name} Results</H2>
            <ResultsDetail><Value>{submissions.length}</Value> Submissions</ResultsDetail>
            <ResultsDetail>
              Last submission on <Value>{formatDate(submissions[submissions.length - 1].submittedOn)}</Value>
            </ResultsDetail>
            {form.type === FormType.Test &&
              <>
                <ResultsDetail>
                  <Value>{this.props.submissionsGraded}/{submissions.length}</Value> Submissions Graded
                </ResultsDetail>
                <ResultsDetail>
                  Average Grade: <Value>{this.props.averageGrade}/{form.questions.length}</Value>
                </ResultsDetail>
              </>
            }
            <H3>Submissions</H3>
            {submissions.map((submission) =>
              <SubmissionCard
                key={submission._id}
                form={form}
                submission={submission}
                toSubmission={this.props.toSubmission(form._id, submission._id)}
              />
            )}
          </>
        )}
      </PageWrapper>
    );
  }
}

const mapState = (state: State) => ({
  formReq: state.displayForm.formRequest,
  submissionsGraded: getSubmissionsGraded(state),
  averageGrade: getAverageGrade(state)
});

const mapDispatch = (dispatch: Dispatch<Action<any>>) => ({
  getForm: (id: string) => dispatch(GET_FORM_REQUEST.PENDING(id)),
  toSubmission: (formId: string, subId: string) => () => dispatch(routeActions.SUBMISSION({ formId, subId }))
});

export default connect(mapState, mapDispatch)(Results);
