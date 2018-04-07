import * as React from 'react';
import * as styles from './form.styles.scss';
import {
  Question, QuestionType, Response, TrueFalseResponse,
  MultipleChoiceResponse, MatchingResponse, RankingResponse,
  EssayAnswerResponse, ShortAnswerResponse,
  MultipleChoice as MultipleChoiceQuestion, ShortAnswer as ShortAnswerQuestion,
  Matching as MatchingQuestion, Ranking as RankingQuestion
} from 'models/forms';
import { Action } from 'client/helpers/redux';
import { match, is } from 'client/helpers/misc';
import TrueFalse from 'client/components/TrueFalse';
import MultipleChoice from 'client/components/MultipleChoice';
import ShortAnswer from 'client/components/ShortAnswer';
import EssayAnswer from 'client/components/EssayAnswer';
import Matching from 'client/components/Matching';
import Ranking from 'client/components/Ranking';
import RenderAnswer from './RenderAnswer';

interface Props {
  index: number;
  question: Question;
  response: Response;
  setResponse: (response: Response) => Action<{i: number, response: Response} | undefined>;
  showAnswer: boolean;
}

const RenderQuestion = ({index, question, response, setResponse, showAnswer}: Props) => (
  <div className={styles.questionCard}>
    <div className={styles.questionTop}>
      <div>
        <div className={styles.qNumber}>{index + 1}.</div>
        {question.prompt}
      </div>
    </div>
    {
      match<QuestionType, JSX.Element>(question.type)
        .on(is(QuestionType.TrueFalse), (type) =>
          <TrueFalse
            value={response as TrueFalseResponse}
            onChange={setResponse}
          />
        )
        .on(is(QuestionType.MultipleChoice), (type) =>
          <MultipleChoice
            options={(question as MultipleChoiceQuestion).options}
            value={response as MultipleChoiceResponse || []}
            onChange={setResponse}
          />
        )
        .on(is(QuestionType.ShortAnswer), (type) =>
          <ShortAnswer
            charLimit={(question as ShortAnswerQuestion).charLimit}
            value={response as ShortAnswerResponse || ''}
            onChange={setResponse}
          />
        )
        .on(is(QuestionType.EssayAnswer), (type) =>
          <EssayAnswer
            value={response as EssayAnswerResponse || ''}
            onChange={setResponse}
          />
        )
        .on(is(QuestionType.Matching), (type) =>
          <Matching
            setA={(question as MatchingQuestion).setA}
            setB={(question as MatchingQuestion).setB}
            value={response as MatchingResponse || []}
            onChange={setResponse}
          />
        )
        .on(is(QuestionType.Ranking), (type) =>
          <Ranking
            value={(response as RankingResponse) || (question as RankingQuestion).options}
            onChange={setResponse}
          />
        )
        .otherwise((type) =>
          <TrueFalse
            value={response as TrueFalseResponse}
            onChange={setResponse}
          />
        )
    }
    {showAnswer && (question as any).answer !== undefined && <RenderAnswer question={question}/>}
  </div>
);

export default RenderQuestion;
