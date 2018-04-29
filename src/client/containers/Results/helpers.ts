import { Question, Response } from 'models/forms';

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
};

export const isGraded = (responses: Response[]) =>
  responses.every((response: any) =>
    response.correct === undefined && response.response === undefined
  );

export const submissionGrade = (questions: Question[], responses: Response[]) =>
  responses.reduce((correct, response, index) =>
    (response as any).correct === true
      ? correct + 1
      : response === (questions[index] as any).answer
        ? correct + 1
        : correct
  , 0);
