import { formsCollection } from '../mongo/collections';
import { Form, Question, Submission } from 'models/forms';

/* Create */
export const addForm = (form: Form) =>
  formsCollection()
    .then((collection) => collection.insertOne(form))
    .catch((e) => Promise.reject(e));

export const addSubmission = (id: string, submission: Submission) =>
  formsCollection()
    .then((collection) => collection.update({_id: id}, {$push: {submissions: submission}}))
    .catch((e) => Promise.reject(e));

/* Read */
export const getForm = (id: string): Promise<Form> =>
  formsCollection()
    .then((collection) => collection.findOne({_id: id}))
    .catch((e) => Promise.reject(e));

export const getForms = (createdBy: string): Promise<Form[]> =>
  formsCollection()
    .then((collection) => collection.find({createdBy}).toArray())
    .catch((e) => Promise.reject(e));

/* Update */
export const updateForm = (id: string, published: boolean, name: string, questions: Question[]) =>
  formsCollection()
    .then((collection) => collection.findOne({_id: id})
    .then((form: Form) => !form.submissions.length
      ? collection.update({_id: id}, {$set: {published, name, questions}})
      : Promise.reject(new Error('Cannot update form after submissions have been received.'))))
    .catch((e) => Promise.reject(e));

export const gradeSubmission = (id: string, index: number, submission: Submission) =>
  formsCollection()
    .then((collection) => collection.update({_id: id}, {$set: {[`submissions.${index}`]: submission}}))
    .catch((e) => Promise.reject(e));

/* Delete */
export const deleteForm = (id: string) =>
  formsCollection()
    .then((collection) => collection.deleteOne({_id: id}))
    .catch((e) => Promise.reject(e));
