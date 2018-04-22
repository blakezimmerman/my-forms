import * as React from 'react';
import { TransitionMotion, spring } from 'react-motion';

interface Props {
  children: JSX.Element | JSX.Element[] | undefined;
}

const SlideInOut = ({children}: Props) => {
  const childList = !children
    ? []
    : children instanceof Array
      ? children
      : [children];

  const enterSpringConfig = { stiffness: 180, damping: 26, precision: 1 };
  const leaveSpringConfig = { stiffness: 180, damping: 26, precision: 25 };

  const willEnter = () => ({ pos: -100 });
  const willLeave = () => ({ pos: spring(105, leaveSpringConfig) });

  return (
    <TransitionMotion
      willEnter={willEnter}
      willLeave={willLeave}
      styles={childList.map((child) => ({
        key: child.key + '',
        data: child,
        style: { pos: spring(0, enterSpringConfig) }
      }))}
    >
      {(interpolatedStyles) =>
        <>
          {interpolatedStyles.map(({ key, data, style }) => (
            <div key={key} style={{ transform: `translateX(${style.pos}%)` }}>
              {data}
            </div>
          ))}
        </>
      }
    </TransitionMotion>
  );
};

export default SlideInOut;
