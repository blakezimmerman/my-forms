export interface Form {
  _id: string;
  createdBy: string;
  published: boolean;
  type: 'survey' | 'test';
  questions: Question[];
  submissions: Submission[];
}

export interface Question {
  prompt: string;
  type: 'trueFalse' | 'multipleChoice' | 'shortAnswer' | 'essayAnswer' | 'matching' | 'ranking';
}

export interface TrueFalseTest extends Question {
  answer: boolean;
}

export interface MultipleChoice extends Question {
  options: string[];
}

export interface MultipleChoiceTest extends MultipleChoice {
  answer: string[];
}

export interface ShortAnswer extends Question {
  charLimit: number;
}

export interface Matching extends Question {
  setA: string[];
  setB: string[];
}

export interface MatchingTest extends Question {
  answer: number[];
}

export interface Ranking extends Question {
  options: string[];
}

export interface RankingTest extends Question {
  answer: string[];
}

type Submission = Response[];

type Reponse =
  TrueFalseResponse | MultipleChoiceResponse |
  ShortAnswerResponse | EssayAnswerResponse |
  MatchingResponse | RankingResponse;

type TrueFalseResponse = boolean;
type MultipleChoiceResponse = string[];
type ShortAnswerResponse = string;
type EssayAnswerResponse = string;
type MatchingResponse = number[];
type RankingResponse = string[];
