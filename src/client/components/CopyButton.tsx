import * as React from 'react';
import styled from 'client/styling';
import * as copy from 'copy-to-clipboard';
import { Button } from './Buttons';

interface Props {
  text: string;
  color?: string;
}

interface State {
  copied: boolean;
}

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  i { margin-right: 0.25rem; }
`;

class CopyButton extends React.Component<Props, State> {
  state = { copied: false };

  copyText = () => {
    const success = copy(this.props.text, {
      debug: false,
      message: 'Press #{key} to copy'
    });

    if (success) { this.setState({ copied: true }); }
  }

  render() {
    return (
      <Button color={this.props.color} onClick={this.copyText}>
        <ContentWrapper>
          <i className='material-icons'>content_copy</i>
          {this.state.copied ? 'Copied' : 'Copy Link'}
        </ContentWrapper>
      </Button>
    );
  }
}

export default CopyButton;
