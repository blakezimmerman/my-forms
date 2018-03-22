import * as React from 'react';
import * as styles from './form.styles.scss';
import { connect } from 'react-redux';
import { State } from 'client/store/rootReducer';
import { Form } from 'models/forms';
import { ActionDispatcher, AsyncReducerState } from 'client/shared/reduxUtils';
import { GET_FORM_REQUEST } from './form.reducer';
import ViewForm from './viewForm';
import TakeForm from './takeForm';

interface Props {
  id: string;
  getForm: ActionDispatcher<string>;
  formReq: AsyncReducerState<Form>;
  curUser: string;
}

class DisplayForm extends React.Component<Props> {
  componentWillMount() {
    this.props.getForm(this.props.id);
  }

  render() {
    const { formReq } = this.props;

    return (
      <>
        {formReq.pending && <div className={styles.loader}>Loading...</div>}
        {formReq.error && <div className={styles.error}>Unable to Load Form</div>}
        {formReq.result && (
          formReq.result.createdBy === this.props.curUser
            ? <ViewForm form={formReq.result}/>
            : <TakeForm form={formReq.result}/>
        )}
      </>
    );
  }
}

const mapState = (state: State) => ({
  formReq: state.form.formRequest,
  curUser: state.login.loginRequest.result
});

const mapDispatch = {
  getForm: GET_FORM_REQUEST.PENDING
};

export default connect(mapState, mapDispatch)(DisplayForm);
