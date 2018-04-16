import * as React from 'react';
import { connect } from 'react-redux';
import { State } from 'client/store';
import { ActionDispatcher, AsyncReducerState} from 'client/helpers/redux';
import { InsertOneWriteOpResult } from 'mongodb';
import { NewForm, FormType } from 'models/forms';
import { CREATE_REQUEST } from './reducer';
import FormEditor from '../FormEditor';

interface Props {
  type: FormType;
  createReq: AsyncReducerState<InsertOneWriteOpResult>;
  CREATE_REQUEST_PENDING: ActionDispatcher<NewForm>;
  CREATE_REQUEST_RESET: ActionDispatcher<void>;
}

const CreateForm = (props: Props) => (
  <FormEditor
    submitText={`Create ${props.type}`}
    submitReq={props.createReq}
    SUBMIT_REQUEST_PENDING={props.CREATE_REQUEST_PENDING}
    SUBMIT_REQUEST_RESET={props.CREATE_REQUEST_RESET}
  />
);

const mapState = (state: State) => ({
  type: state.formEditor.type,
  createReq: state.create
});

const mapDispatch = {
  CREATE_REQUEST_PENDING: CREATE_REQUEST.PENDING,
  CREATE_REQUEST_RESET: CREATE_REQUEST.RESET
};

export default connect(mapState, mapDispatch)(CreateForm);
