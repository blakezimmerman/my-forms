import * as React from 'react';
import { Motion, spring, PlainStyle } from 'react-motion';

interface Props {
  children: JSX.Element | JSX.Element[] | undefined;
}

const FadeIn = ({ children }: Props) => (
  <Motion
    defaultStyle={{ opacity: 0 }}
    style={{ opacity: spring(1, { stiffness: 100, damping: 20 }) }}
  >
    {(interpolatingStyle: PlainStyle) =>
      <div
        style={{
          opacity: interpolatingStyle.opacity,
          width: '100%'
        }}
      >
        {children}
      </div>
    }
  </Motion>
);

export default FadeIn;
