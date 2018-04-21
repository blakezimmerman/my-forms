import * as React from 'react';
import styled, { media, withTheme, Theme } from 'client/styling';
import { Action } from 'client/helpers/redux';
import { Form, FormType } from 'models/forms';
import Card from 'client/components/Card';
import Badge from 'client/components/Badge';
import { InvertedButton } from 'client/components/Buttons';
import { truncate } from 'client/helpers/styles';

const CardWrapper = Card.extend`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 1rem 1rem;
  padding: 1rem;
`;

const FormName = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 450px;
`;

const ActionButton = InvertedButton.extend`
  display: inline-block;
  margin: 0.6rem 1rem 0 0;
  font-size: 1rem;
  padding: 0.25rem 0.6rem;
  width: 9rem;
`;

const FormBadge = Badge.extend`
  margin: 0.6rem 0 0 1rem;
  width: 9rem;
  ${truncate('9rem')}
`;

interface Props {
  theme: Theme;
  form: Form;
  displayForm: (form: Form) => () => void;
  editForm: (form: Form) => () => void;
  deleteForm: (id: string) => () => Action<string>;
}

const FormCard = (props: Props) => (
  <CardWrapper>
    <FormName>{props.form.name}</FormName>
    <Row>
      <ActionButton onClick={props.displayForm(props.form)}>View</ActionButton>
      <FormBadge
        color={props.form.type === FormType.Survey
          ? props.theme.colors.primaryLight
          : props.theme.colors.primaryDark
        }
      >
        {props.form.type}
      </FormBadge>
    </Row>
    <Row>
      {props.form.submissions.length
        ? <ActionButton>Results</ActionButton>
        : <ActionButton onClick={props.editForm(props.form)}>Edit</ActionButton>
      }
      {props.form.published
        ? <FormBadge color={props.theme.colors.success}>Published</FormBadge>
        : <FormBadge color={props.theme.colors.failure}>Unpublished</FormBadge>
      }
    </Row>
    <Row>
      <ActionButton onClick={props.deleteForm(props.form._id)}>Delete</ActionButton>
      <FormBadge color={props.theme.colors.primary}>
        {props.form.submissions.length === 1
          ? '1 Submission'
          : `${props.form.submissions.length} Submissions`
        }
      </FormBadge>
    </Row>
  </CardWrapper>
);

export default withTheme(FormCard);
