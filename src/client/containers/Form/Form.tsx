import * as React from 'react';
import * as styles from './form.styles.scss';
import { connect } from 'react-redux';
import { State } from 'client/store';
import { Form, Response } from 'models/forms';
import { Action, ActionDispatcher, AsyncReducerState } from 'client/helpers/redux';
import { InsertOneWriteOpResult } from 'mongodb';
import {
  GET_FORM_REQUEST, INIT_RESPONSES,
  SET_RESPONSE, SUBMIT_RESPONSES_REQUEST
} from './reducer';
import ViewForm from './ViewForm';
import TakeForm from './TakeForm';
import DelayRender from 'client/components/DelayRender';

interface Props {
  id: string;
  formReq: AsyncReducerState<Form>;
  responses: Response[];
  curUser: string;
  submitReq: AsyncReducerState<InsertOneWriteOpResult>;
  getForm: ActionDispatcher<string>;
  initResponses: ActionDispatcher<number>;
  setResponse: ActionDispatcher<{i: number, response: Response}>;
  submitResponses: ActionDispatcher<{id: string, responses: Response[]}>;
  resetSubmit: ActionDispatcher<void>;
}

export interface DisplayFormProps {
  form: Form;
  responses: Response[];
  submitReq?: AsyncReducerState<InsertOneWriteOpResult>;
  initResponses: ActionDispatcher<number>;
  setResponse: (i: number) => (response: Response) => Action<{i: number, response: Response} | undefined>;
  submitResponses?: () => void;
  resetSubmit?: () => void;
}

class DisplayForm extends React.Component<Props> {
  componentWillMount() {
    this.props.getForm(this.props.id);
  }

  setResponse = (i: number) => (response: Response) => this.props.setResponse({i, response});

  submitResponses = () => {
    this.props.submitResponses({id: this.props.id, responses: this.props.responses});
  }

  resetSubmit = () => {
    this.props.resetSubmit();
  }

  render() {
    const { formReq, responses, submitReq, initResponses } = this.props;
    return (
      <>
        <DelayRender>
          <>{formReq.pending && <div className={styles.loader}>Loading...</div>}</>
        </DelayRender>
        {formReq.error && <div className={styles.error}>Unable to Load Form</div>}
        {formReq.result && (
          formReq.result.createdBy === this.props.curUser
            ? <ViewForm
                form={formReq.result}
                responses={responses}
                initResponses={initResponses}
                setResponse={this.setResponse}
            />
            : formReq.result.published
                ? <TakeForm
                    form={formReq.result}
                    responses={responses}
                    submitReq={submitReq}
                    initResponses={initResponses}
                    setResponse={this.setResponse}
                    submitResponses={this.submitResponses}
                    resetSubmit={this.resetSubmit}
                />
                : <div className={styles.error}>
                    This form is not published
                  </div>
        )}
      </>
    );
  }
}

const mapState = (state: State) => ({
  formReq: state.form.formRequest,
  responses: state.form.responses,
  curUser: state.login.loginRequest.result,
  submitReq: state.form.submitRequest
});

const mapDispatch = {
  getForm: GET_FORM_REQUEST.PENDING,
  initResponses: INIT_RESPONSES,
  setResponse: SET_RESPONSE,
  submitResponses: SUBMIT_RESPONSES_REQUEST.PENDING,
  resetSubmit: SUBMIT_RESPONSES_REQUEST.RESET
};

export default connect(mapState, mapDispatch)(DisplayForm);
