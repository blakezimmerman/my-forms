import * as React from 'react';
import { StaggeredMotion, TransitionMotion, spring, PlainStyle } from 'react-motion';

interface Props {
  children: JSX.Element[];
}

const SlideIn = ({ children }: Props) => {
  const initialPositions: PlainStyle[] = children.map((elem) => ({ pos: -100 }));

  const springVals = {stiffness: 200, damping: 20};

  const calcStyles = (prevVals: PlainStyle[]) =>
    prevVals.map((_, i) =>
      i === 0
        ? {pos: spring(0, springVals)}
        : {pos: spring(prevVals[i - 1].pos, springVals)}
  );

  return(
    <StaggeredMotion
      defaultStyles={initialPositions}
      styles={calcStyles}
    >
      {(interpolatingStyles: PlainStyle[]) =>
        <div style={{ width: '100%' }}>
          {children.map((elem, i) => (
            <div
              key={i}
              style={{ transform: `translateX(${interpolatingStyles[i].pos}%)` }}
            >
              {elem}
            </div>
          ))}
        </div>
      }
    </StaggeredMotion>
  );
};

export default SlideIn;
