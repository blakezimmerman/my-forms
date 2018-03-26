import {
  FormType, NewForm,  QuestionType, TrueFalse,
  MultipleChoice, ShortAnswer, Matching, Ranking,
  Response, MultipleChoiceResponse, ShortAnswerResponse,
  EssayAnswerResponse, MatchingResponse
} from 'models/forms';
import { match, is } from 'client/shared/miscUtils';

export const isValidNewForm = (form: NewForm) =>
  form.name && form.published !== undefined &&
  form.questions && form.questions.length &&
    form.questions.every((q) =>
      !!q.prompt &&
      match<QuestionType, boolean>(q.type)
        .on(is(QuestionType.TrueFalse), () => isValidNewTrueFalse(form.type, q as TrueFalse))
        .on(is(QuestionType.MultipleChoice), () => isValidNewMultipleChoice(form.type, q as MultipleChoice))
        .on(is(QuestionType.ShortAnswer), () => isValidNewShortAnswer(q as ShortAnswer))
        .on(is(QuestionType.EssayAnswer), () => true)
        .on(is(QuestionType.Matching), () => isValidNewMatching(form.type, q as Matching))
        .on(is(QuestionType.Ranking), () => isValidNewRanking(form.type, q as Ranking))
        .otherwise(() => false)
    );

export const isValidNewTrueFalse = (formType: FormType, q: TrueFalse) => formType === FormType.Survey
  ? true
  : q.answer !== undefined;

export const isValidNewMultipleChoice = (formType: FormType, q: MultipleChoice) => formType === FormType.Survey
  ? !!(q.options && q.options.length > 1)
  : !!(q.options && q.options.length > 1 && q.answer && q.answer.length);

export const isValidNewShortAnswer = (q: ShortAnswer) => !!q.charLimit;

export const isValidNewMatching = (formType: FormType, q: Matching) => formType === FormType.Survey
  ? !!(q.setA && q.setA.length && q.setB && q.setB.length)
  : !!(q.setA && q.setA.length && q.setB && q.setB.length &&
       q.answer && q.answer.length === q.setB.length && q.answer.every((a) => a !== undefined && !isNaN(a)));

export const isValidNewRanking = (formType: FormType, q: Ranking) => formType === FormType.Survey
  ? !!(q.options && q.options.length > 1)
  : !!(q.options && q.options.length > 1 && q.answer);

export const areValidResponses = (responses: Array<{type: QuestionType, value: Response}>) =>
  responses.every((response) =>
    response.value !== undefined &&
    match<QuestionType, boolean>(response.type)
      .on(is(QuestionType.TrueFalse), () =>
        response.value !== undefined
      )
      .on(is(QuestionType.MultipleChoice), () =>
        (response.value as MultipleChoiceResponse).length > 0
      )
      .on(is(QuestionType.ShortAnswer), () =>
        !!(response.value as ShortAnswerResponse).response.length
      )
      .on(is(QuestionType.EssayAnswer), () =>
        !!(response.value as EssayAnswerResponse).response.length
      )
      .on(is(QuestionType.Matching), () =>
        (response.value as MatchingResponse).every((x) => x !== undefined && !isNaN(x))
      )
      .on(is(QuestionType.Ranking), () =>
        response.value !== undefined
      )
      .otherwise(() => false)
  );
