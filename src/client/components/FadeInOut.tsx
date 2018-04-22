import * as React from 'react';
import { TransitionMotion, spring } from 'react-motion';

interface Props {
  children: JSX.Element | JSX.Element[] | undefined;
}

const FadeInOutOut = ({ children }: Props) => {
  const childList = !children
    ? []
    : children instanceof Array
      ? children
      : [children];

  const enterSpringConfig = { stiffness: 170, damping: 26, precision: 0.1 };
  const leaveSpringConfig = { stiffness: 175, damping: 26, precision: 0.25 };

  const willEnter = () => ({ opacity: 0 });
  const willLeave = () => ({ opacity: spring(0, leaveSpringConfig) });

  return (
    <TransitionMotion
      willEnter={willEnter}
      willLeave={willLeave}
      defaultStyles={childList.map((child) => ({
        key: child.key + '',
        data: child,
        style: { opacity: 0 }
      }))}
      styles={childList.map((child) => ({
        key: child.key + '',
        data: child,
        style: { opacity: spring(1, enterSpringConfig) }
      }))}
    >
        {(interpolatedStyles) =>
          <>
            {interpolatedStyles.map(({ key, data, style }) => (
              <div key={key} style={{ opacity: style.opacity, width: '100%' }}>
                {data}
              </div>
            ))}
          </>
        }
    </TransitionMotion>
  );
};

export default FadeInOutOut;
