import * as React from 'react';
import * as styles from './form.styles.scss';
import { connect } from 'react-redux';
import { State } from 'client/store/rootReducer';
import { Form, Response } from 'models/forms';
import { Action, ActionDispatcher, AsyncReducerState } from 'client/shared/reduxUtils';
import { GET_FORM_REQUEST, INIT_RESPONSES, SET_RESPONSE } from './form.reducer';
import ViewForm from './viewForm';
import TakeForm from './takeForm';

interface Props {
  id: string;
  formReq: AsyncReducerState<Form>;
  responses: Response[];
  curUser: string;
  getForm: ActionDispatcher<string>;
  initResponses: ActionDispatcher<number>;
  setResponse: ActionDispatcher<{i: number, response: Response}>;
}

export interface DisplayFormProps {
  form: Form;
  responses: Response[];
  initResponses: ActionDispatcher<number>;
  setResponse: (i: number) => (response: Response) => Action<{i: number, response: Response} | undefined>;
}

class DisplayForm extends React.Component<Props> {
  componentWillMount() {
    this.props.getForm(this.props.id);
  }

  setResponse = (i: number) => (response: Response) => this.props.setResponse({i, response});

  render() {
    const { formReq, responses, initResponses } = this.props;

    return (
      <>
        {formReq.pending && <div className={styles.loader}>Loading...</div>}
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
                    initResponses={initResponses}
                    setResponse={this.setResponse}
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
  curUser: state.login.loginRequest.result
});

const mapDispatch = {
  getForm: GET_FORM_REQUEST.PENDING,
  initResponses: INIT_RESPONSES,
  setResponse: SET_RESPONSE
};

export default connect(mapState, mapDispatch)(DisplayForm);
