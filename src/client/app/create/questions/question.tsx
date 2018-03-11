import * as React from 'react';
import * as styles from '../create.styles.scss';
import { connect } from 'react-redux';
import { State } from 'client/store/rootReducer';
import { REMOVE_QUESTION, UPDATE_PROMPT, SET_ANSWER, SET_OPTIONS } from '../create.reducer';
import {
    FormType, Question, QuestionType, Response, TrueFalse,
    MultipleChoice, ShortAnswer, Matching, Ranking
} from 'models/forms';
import { match, is } from 'client/shared/miscUtils';
import { ActionDispatcher } from 'client/shared/reduxUtils';
import TextareaAutosize from 'react-autosize-textarea';
import CreateTrueFalse from './trueFalse';
import CreateMultipleChoice from './multipleChoice';
import CreateShortAnswer from './shortAnswer';
import CreateMatching from './matching';
import CreateRanking from './ranking';

export interface Props {
  type: FormType;
  question: Question;
  index: number;
  REMOVE_QUESTION: ActionDispatcher<number>;
  UPDATE_PROMPT: ActionDispatcher<{i: number, prompt: string}>;
  SET_ANSWER: ActionDispatcher<{i: number, answer: Response}>;
  SET_OPTIONS: ActionDispatcher<{i: number, options: string[]}>;
}

const CreateQuestion = (props: Props) => {
  const handlePrompt = (event: React.SyntheticEvent<HTMLTextAreaElement>) =>
    props.UPDATE_PROMPT({i: props.index, prompt: event.currentTarget.value});

  const removeQuestion = () => props.REMOVE_QUESTION(props.index);

  const setAnswer = (answer: Response) => props.SET_ANSWER({i: props.index, answer});

  const setOptions = (options: string[]) => props.SET_OPTIONS({i: props.index, options});

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
          .on(is(QuestionType.TrueFalse), (type) =>
            <CreateTrueFalse
              type={props.type}
              question={props.question as TrueFalse}
              setAnswer={setAnswer}
            />)
          .on(is(QuestionType.MultipleChoice), (type) =>
            <CreateMultipleChoice
              type={props.type}
              question={props.question as MultipleChoice}
              setOptions={setOptions}
              setAnswer={setAnswer}
            />)
          .on(is(QuestionType.ShortAnswer), (type) =>
            <CreateShortAnswer
              question={props.question as ShortAnswer}
            />)
          .on(is(QuestionType.EssayAnswer), (type) =>
            <div className={styles.centeredBadge}>
              <div>Essay Answer Question</div>
            </div>)
          .on(is(QuestionType.Matching), (type) =>
            <CreateMatching
              type={props.type}
              question={props.question as Matching}
              setAnswer={setAnswer}
            />)
          .on(is(QuestionType.Ranking), (type) =>
            <CreateRanking
              type={props.type}
              question={props.question as Ranking}
              setAnswer={setAnswer}
            />)
          .otherwise((type) =>
            <CreateTrueFalse
              type={props.type}
              question={props.question as TrueFalse}
              setAnswer={setAnswer}
            />)
      }
    </div>
  );
};

const mapDispatch = {
  REMOVE_QUESTION,
  UPDATE_PROMPT,
  SET_ANSWER,
  SET_OPTIONS
};

export default connect(null, mapDispatch)(CreateQuestion);
