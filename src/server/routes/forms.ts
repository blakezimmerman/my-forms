import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { secret } from '../app';
import { userNameinCookies, checkMatchFound } from './helpers';
import {
  addForm, getForm, getForms, updateForm,
  setPublished, addSubmission, deleteForm, gradeSubmission
} from '../data/forms';

const router = express.Router();

// Check that form belongs to user
const checkPermission = (req: express.Request, id: string): Promise<string> =>
  new Promise((resolve, reject) =>
    userNameinCookies(req, (err: Error, decoded: string) => {
      if (err || !decoded) {
        reject(new Error('Unauthorized'));
      }
      getForms(decoded)
        .then((forms) => forms.some((x) => x._id === id)
          ? resolve(decoded)
          : reject(new Error('Unauthorized'))
        )
        .catch((e) => reject(new Error('Unauthorized')));
    })
  );

/* Create */
router.post('/', (req, res) => // New Form
  userNameinCookies(req, (err: Error, decoded: string) => {
    if (err || !decoded) {
      res.status(403).json('Unauthorized');
    }
    const form = {
      _id: new ObjectId().toHexString(),
      createdBy: decoded,
      submissions: [],
      ...req.body
    };
    addForm(form)
      .then((result) => res.json(result))
      .catch((e) => res.status(500).json('Unable to create form. Please try again later.'));
  })
);

router.post('/:id/submissions', (req, res) => // New Submission
  userNameinCookies(req, (err: Error, decoded: string) => {
    if (err || !decoded) {
      decoded = 'Anonymous';
    }
    const submission = {
      submittedBy: decoded,
      responses: req.body
    };
    addSubmission(req.params.id, submission)
      .then((result) => checkMatchFound(result, res))
      .catch((e) => res.status(500).json('Unable to submit responses. Please try again later.'));
  })
);

/* Read */
router.get('/:id', (req, res) => // Get Form by ID
  getForm(req.params.id)
    .then((result) => result ? res.json(result) : res.status(404).json('Form not found.'))
    .catch((e) => res.status(500).json('Unable fetch form. Please try again later.'))
);

router.get('/creator/:createdBy', (req, res) => // Get Forms by creator
  getForms(req.params.createdBy)
    .then((result) => res.json(result))
    .catch((e) => res.status(500).json('Unable fetch forms. Please try again later.'))
);

/* Update */
router.put('/:id', (req, res) => // Update questions of form
  checkPermission(req, req.params.id)
    .then((userName) => updateForm(req.params.id, req.body)
      .then((result) => checkMatchFound(result, res))
      .catch((e) => res.status(500).json('Unable to update form. Please try again later.'))
    )
    .catch((e: Error) => res.status(403).json(e.message))
);

router.put('/:id/published', (req, res) => // Update published status of form
  checkPermission(req, req.params.id)
    .then((userName) => setPublished(req.params.id, req.body)
      .then((result) => checkMatchFound(result, res))
      .catch((e) => res.status(500).json('Unable to update form. Please try again later.'))
    )
    .catch((e: Error) => res.status(403).json(e.message))
);

router.put('/:id/submissions/:index', (req, res) => // Grade submission
  checkPermission(req, req.params.id)
    .then((userName) => gradeSubmission(req.params.id, req.params.index, req.body)
      .then((result) => checkMatchFound(result, res))
      .catch((e) => res.status(500).json('Unable to grade submission. Please try again later.'))
    )
    .catch((e: Error) => res.status(403).json(e.message))
);

/* Delete */
router.delete('/:id', (req, res) => // Delete form
  checkPermission(req, req.params.id)
    .then((userName) => deleteForm(req.params.id)
      .then((result) => checkMatchFound(result, res))
      .catch((e) => res.status(500).json('Unable to delete form. Please try again later.'))
    )
    .catch((e: Error) => res.status(403).json(e.message))
);

export default router;
