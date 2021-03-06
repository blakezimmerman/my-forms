export enum FormType {
  Survey = 'Survey',
  Test = 'Test'
}

export interface NewForm {
  published: boolean;
  type: FormType;
  name: string;
  questions: Question[];
}

export interface Form {
  _id: string;
  createdBy: string;
  published: boolean;
  type: FormType;
  name: string;
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

export type Question =
  TrueFalse | MultipleChoice | ShortAnswer |
  Matching  | Ranking;

export interface QuestionBase {
  _id: string;
  prompt: string;
  type: QuestionType;
}

export interface TrueFalse extends QuestionBase {
  answer?: TrueFalseResponse;
}

export interface MultipleChoice extends QuestionBase {
  options: string[];
  answer?: MultipleChoiceResponse;
}

export interface ShortAnswer extends QuestionBase {
  charLimit: number;
}

export interface Matching extends QuestionBase {
  setA: string[];
  setB: string[];
  answer?: MatchingResponse;
}

export interface Ranking extends QuestionBase {
  options: string[];
  answer?: RankingResponse;
}

export interface Submission {
  _id: string;
  submittedBy: string;
  submittedOn: string;
  responses: Response[];
}

export type Response =
  TrueFalseResponse   | MultipleChoiceResponse |
  ShortAnswerResponse | EssayAnswerResponse    |
  MatchingResponse    | RankingResponse;

export type TrueFalseResponse = boolean;
export type MultipleChoiceResponse = string[];
export type ShortAnswerResponse = { response: string, correct: boolean | undefined };
export type EssayAnswerResponse = { response: string, correct: boolean | undefined };
export type MatchingResponse = number[];
export type RankingResponse = string[];
