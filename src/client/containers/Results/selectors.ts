import { createSelector } from 'reselect';
import { State } from 'client/store';
import { submissionGrade } from './helpers';

export const getForm = (state: State) => state.displayForm.formRequest.result;
export const getSubmissions = (state: State) => {
  const form = getForm(state);
  return form ? form.submissions : undefined;
};

export const getSubmissionsGraded = createSelector(
  getSubmissions,
  (submissions) => !submissions ? undefined :
    submissions.reduce((graded, submission) =>
      submission.responses.every((response) =>
        (response instanceof Object && !Array.isArray(response))
          ? (response as any).correct !== undefined
          : true
      ) ? graded + 1 : graded
    , 0)
);

export const getAverageGrade = createSelector(
  getForm,
  getSubmissions,
  (form, submissions) => {
    if (!form || !submissions) {
      return undefined;
    }
    const { questions } = form;
    return submissions.reduce((total, submission) =>
      total + submissionGrade(questions, submission.responses)
    , 0) / submissions.length;
  }
);
