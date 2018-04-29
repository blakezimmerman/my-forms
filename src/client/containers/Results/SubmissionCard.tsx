import * as React from 'react';
import styled, { withTheme, Theme } from 'client/styling';
import { Form, Submission, FormType } from 'models/forms';
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
}

const SubmissionCard = ({theme, form, submission}: Props) => (
  <CardWrapper>
    <div>
      <UserName>{submission.submittedBy}</UserName>
      <SubmitDate> — {formatDate(submission.submittedOn)}</SubmitDate>
    </div>
    {form.type === FormType.Test &&
      <Badge color={isGraded(submission.responses) ? theme.colors.primary : theme.colors.failure}>
        {isGraded(submission.responses)
          ? `Grade: ${submissionGrade(form.questions, submission.responses)}/${form.questions.length}`
          : 'Not Graded'
        }
      </Badge>
    }
    <ActionButton>View</ActionButton>
  </CardWrapper>
);

export default withTheme(SubmissionCard);
