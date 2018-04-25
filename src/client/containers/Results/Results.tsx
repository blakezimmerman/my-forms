import * as React from 'react';
import { connect } from 'react-redux';
import { State } from 'client/store';
import { ActionDispatcher, AsyncReducerState } from 'client/helpers/redux';
import { Form } from 'models/forms';
import { GET_FORM_REQUEST } from '../DisplayForm';
import { Loading } from 'client/components/Loaders';
import Error from 'client/components/Error';

interface Props {
  id: string;
  formReq: AsyncReducerState<Form>;
  getForm: ActionDispatcher<string>;
}

class Results extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.formReq.result || this.props.formReq.result._id !== this.props.id) {
      this.props.getForm(this.props.id);
    }
  }

  render() {
    return (
      <>
        {this.props.formReq.pending && <Loading/>}
        {this.props.formReq.error && <Error>Unable to load form</Error>}
        {this.props.formReq.result && (
          <div>Results page for {this.props.formReq.result.name}</div>
        )}
      </>
    );
  }
}

const mapState = (state: State) => ({
  formReq: state.displayForm.formRequest
});

const mapDispatch = {
  getForm: GET_FORM_REQUEST.PENDING
};

export default connect(mapState, mapDispatch)(Results);
