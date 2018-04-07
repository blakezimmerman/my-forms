import * as React from 'react';

interface Props {
  children: JSX.Element | JSX.Element[] | undefined;
}

class DelayRender extends React.Component<Props> {
  state = { shouldRender: false };

  componentDidMount() {
    setTimeout(() => this.setState({shouldRender: true}), 400);
  }

  render() {
    return this.state.shouldRender
      ? this.props.children
      : null;
  }
}

export default DelayRender;
