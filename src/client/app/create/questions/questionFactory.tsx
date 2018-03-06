import * as React from 'react';
import { Question, QuestionType } from 'models/forms';
import { match, is } from 'client/shared/miscUtils';
import TrueFalse from './trueFalse';
import MultipleChoice from './multipleChoice';
import ShortAnswer from './shortAnswer';
import EssayAnswer from './essayAnswer';
import Matching from './matching';
import Ranking from './ranking';

export interface QuestionProps {
  question: Question;
  index: number;
}

const QuestionFactory = (props: QuestionProps) => (
  match<QuestionType, JSX.Element>(props.question.type)
    .on(is(QuestionType.TrueFalse), (type) => <TrueFalse {...props}/>)
    .on(is(QuestionType.MultipleChoice), (type) => <MultipleChoice {...props}/>)
    .on(is(QuestionType.ShortAnswer), (type) => <ShortAnswer {...props}/>)
    .on(is(QuestionType.EssayAnswer), (type) => <EssayAnswer {...props}/>)
    .on(is(QuestionType.Matching), (type) => <Matching {...props}/>)
    .on(is(QuestionType.Ranking), (type) => <Ranking {...props}/>)
    .otherwise((type) => <TrueFalse {...props}/>)
);

export default QuestionFactory;
