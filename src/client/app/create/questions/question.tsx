import * as React from 'react';
import * as styles from '../create.styles.scss';
import { connect } from 'react-redux';
import { State } from 'client/store/rootReducer';
import { REMOVE_QUESTION, UPDATE_PROMPT } from '../create.reducer';
import { Question, QuestionType } from 'models/forms';
import { match, is } from 'client/shared/miscUtils';
import { ActionDispatcher } from 'client/shared/reduxUtils';
import TextareaAutosize from 'react-autosize-textarea';
import TrueFalse from './trueFalse';
import MultipleChoice from './multipleChoice';
import ShortAnswer from './shortAnswer';
import EssayAnswer from './essayAnswer';
import Matching from './matching';
import Ranking from './ranking';

export interface QuestionProps {
  question: Question;
  index: number;
  REMOVE_QUESTION: ActionDispatcher<number>;
  UPDATE_PROMPT: ActionDispatcher<{i: number, prompt: string}>;
}

const QuestionCard = (props: QuestionProps) => {
  const handlePrompt = (event: React.SyntheticEvent<HTMLTextAreaElement>) =>
    props.UPDATE_PROMPT({i: props.index, prompt: event.currentTarget.value});

  const removeQuestion = () => props.REMOVE_QUESTION(props.index);

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionTop}>
        {props.index + 1}.
        <TextareaAutosize
          value={props.question.prompt}
          onChange={handlePrompt}
          placeholder={`Enter Prompt...`}
        />
        <i className='material-icons' onClick={removeQuestion}>close</i>
      </div>
      {
        match<QuestionType, JSX.Element>(props.question.type)
          .on(is(QuestionType.TrueFalse), (type) => <TrueFalse {...props}/>)
          .on(is(QuestionType.MultipleChoice), (type) => <MultipleChoice {...props}/>)
          .on(is(QuestionType.ShortAnswer), (type) => <ShortAnswer {...props}/>)
          .on(is(QuestionType.EssayAnswer), (type) => <EssayAnswer {...props}/>)
          .on(is(QuestionType.Matching), (type) => <Matching {...props}/>)
          .on(is(QuestionType.Ranking), (type) => <Ranking {...props}/>)
          .otherwise((type) => <TrueFalse {...props}/>)
      }
    </div>
  );
};

const mapDispatch = {
  REMOVE_QUESTION,
  UPDATE_PROMPT
};

export default connect(null, mapDispatch)(QuestionCard);
