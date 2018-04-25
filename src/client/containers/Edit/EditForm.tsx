import * as React from 'react';
import { media } from 'client/styling';
import { connect } from 'react-redux';
import { State } from 'client/store';
import { ActionDispatcher, AsyncReducerState} from 'client/helpers/redux';
import { WriteOpResult } from 'mongodb';
import { Form, NewForm, FormType } from 'models/forms';
import { GET_EDIT_FORM_REQUEST, EDIT_REQUEST } from './reducer';
import FormEditor from '../FormEditor';
import NotificationBanner from 'client/components/NotificationBanner';
import { Loading } from 'client/components/Loaders';
import Error from 'client/components/Error';

interface Props {
  id: string;
  form: Form;
  type: FormType;
  formReq: AsyncReducerState<Form>;
  editReq: AsyncReducerState<WriteOpResult>;
  GET_EDIT_FORM: ActionDispatcher<void>;
  EDIT_REQUEST_PENDING: ActionDispatcher<NewForm>;
  EDIT_REQUEST_RESET: ActionDispatcher<void>;
}

class EditForm extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.form || this.props.form._id !== this.props.id) {
      this.props.GET_EDIT_FORM();
    }
  }

  render() {
    return (
      <>
        {this.props.formReq.pending && <Loading/>}
        {this.props.formReq.error && <Error>Unable to load form</Error>}
        {this.props.form && (
          <FormEditor
            submitText={`Edit ${this.props.type}`}
            submitReq={this.props.editReq}
            SUBMIT_REQUEST_PENDING={this.props.EDIT_REQUEST_PENDING}
            SUBMIT_REQUEST_RESET={this.props.EDIT_REQUEST_RESET}
          />
        )}
      </>
    );
  }
}

const mapState = (state: State) => ({
  id: (state.location.payload as any).id,
  form: state.formEditor,
  type: state.formEditor.type,
  formReq: state.edit.formRequest,
  editReq: state.edit.editRequest
});

const mapDispatch = {
  GET_EDIT_FORM: GET_EDIT_FORM_REQUEST.PENDING,
  EDIT_REQUEST_PENDING: EDIT_REQUEST.PENDING,
  EDIT_REQUEST_RESET: EDIT_REQUEST.RESET
};

export default connect(mapState, mapDispatch)(EditForm);
