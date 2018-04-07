import * as React from 'react';
import * as styles from '../create.styles.scss';
import { FormType, Response, MultipleChoice as MultipleChoiceQuestion } from 'models/forms';
import { Action } from 'client/helpers/redux';
import CreateList from 'client/components/CreateList';
import FadeIn from 'client/components/FadeIn';
import MultipleChoice from 'client/components/MultipleChoice';

interface Props {
  type: FormType;
  question: MultipleChoiceQuestion;
  setOptions: (options: string[]) => Action<any>;
  setAnswer: (answer: Response) => Action<any>;
}

const CreateMultipleChoice = (props: Props) => (
  <div>
    <div className={styles.centeredBadge}>
      <div>Multiple Choice Question</div>
    </div>
    <div className={styles.optionsPrompt}>
      Provide the options:
    </div>
    <CreateList
      list={props.question.options || []}
      onChange={props.setOptions}
    />
    {props.type === FormType.Test &&
     props.question.options &&
     !!props.question.options.length &&
      <FadeIn>
        <div className={styles.answerPrompt}>
          Provide the correct answer:
        </div>
        <MultipleChoice
          options={props.question.options}
          value={props.question.answer || []}
          onChange={props.setAnswer}
        />
      </FadeIn>
    }
  </div>
);

export default CreateMultipleChoice;
