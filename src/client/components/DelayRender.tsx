import * as React from 'react';

interface Props {
  delay: number;
  children: JSX.Element | JSX.Element[] | undefined;
}

class DelayRender extends React.Component<Props> {
  state = { shouldRender: false };
  timer: number = 0;

  componentDidMount() {
    this.timer = window.setTimeout(
      () => this.setState({ shouldRender: true }),
      this.props.delay
    );
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    return this.state.shouldRender
      ? this.props.children
      : null;
  }
}

export default DelayRender;
