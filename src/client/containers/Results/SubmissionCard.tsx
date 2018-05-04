import * as React from 'react';
import styled, { withTheme, Theme } from 'client/styling';
import { Form, Submission, FormType } from 'models/forms';
import { Action } from 'client/helpers/redux';
import Card from 'client/components/Card';
import Badge from 'client/components/Badge';
import { InvertedButton } from 'client/components/Buttons';
import { truncate } from 'client/helpers/styles';
import { formatDate, isGraded, submissionGrade } from './helpers';

const CardWrapper = Card.extend`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem 1rem;
  padding: 1rem;
`;

const SubmissionInfo = styled.div`
  width: 14rem;
  ${truncate('14rem')}
`;

const UserName = styled.span`
  color: ${({ theme }) => theme.colors.primaryDark};
`;

const SubmitDate = styled.span`
  color: ${({ theme }) => theme.colors.disabled};
`;

const ActionButton = InvertedButton.extend`
  font-size: 1rem;
  padding: 0.25rem 0.6rem;
`;

interface Props {
  theme: Theme;
  form: Form;
  submission: Submission;
  toSubmission: () => Action<{ formId: string, subId: string }>;
}

const SubmissionCard = ({theme, form, submission, toSubmission}: Props) => (
  <CardWrapper>
    <SubmissionInfo>
      <UserName>{submission.submittedBy}</UserName>
      <SubmitDate> — {formatDate(submission.submittedOn)}</SubmitDate>
    </SubmissionInfo>
    {form.type === FormType.Test &&
      <Badge color={isGraded(submission.responses) ? theme.colors.primary : theme.colors.failure}>
        {isGraded(submission.responses)
          ? `Grade: ${submissionGrade(form.questions, submission.responses)}/${form.questions.length}`
          : 'Not Graded'
        }
      </Badge>
    }
    <ActionButton onClick={toSubmission}>View</ActionButton>
  </CardWrapper>
);

export default withTheme(SubmissionCard);
