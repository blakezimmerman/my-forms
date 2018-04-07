import * as React from 'react';
import * as styles from './questions.styles.scss';
import * as R from 'ramda';
import { MatchingResponse } from 'models/forms';

interface Props {
  setA: string[];
  setB: string[];
  value: MatchingResponse;
  onChange: (value: MatchingResponse) => void;
}

const Matching = (props: Props) => {
  const onChange = (index: number) => (event: React.SyntheticEvent<HTMLSelectElement>) => {
    const temp = props.setB.map((item, i) => props.value[i]);
    props.onChange(R.update(index, parseInt(event.currentTarget.value, 10), temp));
  };

  return (
    <div className={styles.matching}>
      <div className={styles.columnContainer}>
        <div className={styles.column}>
          {props.setA.map((item, index) =>
            <div key={item} className={styles.row}>
              <div className={styles.letter}>
                {`${String.fromCharCode(index + 65)}.`}
              </div>
              {item}
            </div>
          )}
        </div>
        <div className={styles.column}>
          {props.setB.map((item, index) =>
            <div key={item} className={styles.row}>
              <select
                value={props.value[index]}
                onChange={onChange(index)}
              >
                <option value={undefined}>-</option>
                {props.setA.map((option, i) =>
                  <option key={option} value={i}>{String.fromCharCode(i + 65)}</option>
                )}
              </select>
              {item}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matching;
