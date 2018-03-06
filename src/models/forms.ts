export enum FormType {
  Survey = 'Survey',
  Test = 'Test'
}

export interface NewForm {
  published: boolean;
  type: FormType;
  questions: Question[];
}

export interface Form {
  _id: string;
  createdBy: string;
  published: boolean;
  type: FormType;
  questions: Question[];
  submissions: Submission[];
}

export enum QuestionType {
  TrueFalse = 'True/False',
  MultipleChoice = 'Multiple Choice',
  ShortAnswer = 'Short Answer',
  EssayAnswer = 'Essay Answer',
  Matching = 'Matching',
  Ranking = 'Ranking'
}

export interface Question {
  _id: string;
  prompt: string;
  type: QuestionType;
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

export interface MatchingTest extends Matching {
  answer: number[];
}

export interface Ranking extends Question {
  options: string[];
}

export interface RankingTest extends Ranking {
  answer: string[];
}

export interface Submission {
  submittedBy: string;
  responses: Response[];
}

type Reponse =
  TrueFalseResponse   | MultipleChoiceResponse |
  ShortAnswerResponse | EssayAnswerResponse    |
  MatchingResponse    | RankingResponse;

type TrueFalseResponse = boolean;
type MultipleChoiceResponse = string[];
type ShortAnswerResponse = { reponse: string, correct: boolean | undefined };
type EssayAnswerResponse = { reponse: string, correct: boolean | undefined };
type MatchingResponse = number[];
type RankingResponse = string[];
